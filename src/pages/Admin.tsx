import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, LogOut, Users, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [admin, setAdmin] = useState<any>(null);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const adminData = localStorage.getItem("civic_admin");
    if (!adminData) {
      navigate("/admin-login");
      return;
    }
    setAdmin(JSON.parse(adminData));

    // Load all complaints from localStorage
    const allComplaints = localStorage.getItem("admin_complaints") || "[]";
    const complaintsData = JSON.parse(allComplaints);
    setComplaints(complaintsData);
    setFilteredComplaints(complaintsData);
  }, [navigate]);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredComplaints(complaints);
    } else {
      setFilteredComplaints(complaints.filter(c => c.status === statusFilter));
    }
  }, [statusFilter, complaints]);

  const handleLogout = () => {
    localStorage.removeItem("civic_admin");
    toast({
      title: "Logged Out",
      description: "Admin session ended successfully.",
    });
    navigate("/");
  };

  const updateComplaintStatus = (complaintId: string, newStatus: string) => {
    const updatedComplaints = complaints.map(complaint => 
      complaint.id === complaintId 
        ? { ...complaint, status: newStatus }
        : complaint
    );
    
    setComplaints(updatedComplaints);
    localStorage.setItem("admin_complaints", JSON.stringify(updatedComplaints));
    
    // Also update user complaints
    const userComplaints = localStorage.getItem("user_complaints") || "[]";
    const userComplaintsData = JSON.parse(userComplaints);
    const updatedUserComplaints = userComplaintsData.map((complaint: any) => 
      complaint.id === complaintId 
        ? { ...complaint, status: newStatus }
        : complaint
    );
    localStorage.setItem("user_complaints", JSON.stringify(updatedUserComplaints));

    toast({
      title: "Status Updated",
      description: `Complaint status changed to ${newStatus}`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "in-progress":
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!admin) {
    return null;
  }

  const stats = [
    { label: "Total Complaints", value: complaints.length, icon: FileText },
    { label: "Pending", value: complaints.filter(c => c.status === "pending").length, icon: Clock },
    { label: "In Progress", value: complaints.filter(c => c.status === "in-progress").length, icon: AlertCircle },
    { label: "Resolved", value: complaints.filter(c => c.status === "resolved").length, icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Civic Connect
            </h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="text-sm">Admin Panel</Badge>
            <span className="text-sm text-muted-foreground">Welcome, {admin.username}</span>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Admin Dashboard</h2>
          <p className="text-muted-foreground">Manage and resolve civic complaints</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <stat.icon className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filter */}
        <div className="mb-6">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Complaints</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Complaints List */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Complaints Management</CardTitle>
            <CardDescription>
              Review and update the status of citizen complaints
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredComplaints.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No complaints found</h3>
                <p className="text-muted-foreground">
                  {statusFilter === "all" ? "No complaints have been submitted yet" : `No ${statusFilter} complaints found`}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredComplaints.map((complaint, index) => (
                  <div
                    key={index}
                    className="border border-border/50 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-lg">{complaint.category}</h4>
                        <p className="text-sm text-muted-foreground">
                          Submitted on {complaint.date}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(complaint.status)}
                        <Badge className={getStatusColor(complaint.status)}>
                          {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium mb-1">Complainant Details:</p>
                        <p className="text-sm text-muted-foreground"><strong>Name:</strong> {complaint.name}</p>
                        <p className="text-sm text-muted-foreground"><strong>Phone:</strong> {complaint.phone}</p>
                        <p className="text-sm text-muted-foreground"><strong>Address:</strong> {complaint.address}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Issue Description:</p>
                        <p className="text-sm text-muted-foreground">{complaint.description}</p>
                        {complaint.image && (
                          <p className="text-sm text-muted-foreground mt-2">
                            <strong>Image:</strong> {complaint.image}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Update Status:</span>
                      <Select
                        value={complaint.status}
                        onValueChange={(value) => updateComplaintStatus(complaint.id, value)}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;