import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, LogOut, Plus, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [complaints, setComplaints] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem("civic_user");
    if (!userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));

    // Load user's complaints from localStorage
    const userComplaints = localStorage.getItem("user_complaints") || "[]";
    setComplaints(JSON.parse(userComplaints));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("civic_user");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
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

  if (!user) {
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
            <span className="text-sm text-muted-foreground">Welcome, {user.username}</span>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Your Dashboard</h2>
          <p className="text-muted-foreground">Track and manage your civic issue reports</p>
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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link to="/submit-complaint">
            <Button size="lg" className="w-full sm:w-auto">
              <Plus className="h-5 w-5 mr-2" />
              Submit New Complaint
            </Button>
          </Link>
        </div>

        {/* Complaints List */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Your Complaints</CardTitle>
            <CardDescription>
              View and track the status of your submitted complaints
            </CardDescription>
          </CardHeader>
          <CardContent>
            {complaints.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No complaints yet</h3>
                <p className="text-muted-foreground mb-4">
                  Submit your first complaint to get started
                </p>
                <Link to="/submit-complaint">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Submit Complaint
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {complaints.map((complaint, index) => (
                  <div
                    key={index}
                    className="border border-border/50 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
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
                    <p className="text-sm mb-3">{complaint.description}</p>
                    <div className="text-xs text-muted-foreground">
                      <p><strong>Name:</strong> {complaint.name}</p>
                      <p><strong>Address:</strong> {complaint.address}</p>
                      <p><strong>Phone:</strong> {complaint.phone}</p>
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

export default Dashboard;