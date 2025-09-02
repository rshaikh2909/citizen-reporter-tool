import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Upload, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SubmitComplaint = () => {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = [
    "Pothole",
    "Garbage Collection",
    "Drainage Issues",
    "Damaged Road",
    "Lack of Water Supply",
    "Electricity Issues",
    "Street Lighting",
    "Public Transportation",
    "Traffic Signals",
    "Other"
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const complaintData = {
      name: formData.get("name") as string,
      address: formData.get("address") as string,
      phone: formData.get("phone") as string,
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      image: selectedImage ? selectedImage.name : null,
      date: new Date().toLocaleDateString(),
      status: "pending",
      id: Date.now().toString()
    };

    // Simulate submission delay
    setTimeout(() => {
      // Save to localStorage
      const existingComplaints = localStorage.getItem("user_complaints") || "[]";
      const complaints = JSON.parse(existingComplaints);
      complaints.push(complaintData);
      localStorage.setItem("user_complaints", JSON.stringify(complaints));

      // Also save to admin complaints list
      const adminComplaints = localStorage.getItem("admin_complaints") || "[]";
      const adminComplaintsList = JSON.parse(adminComplaints);
      adminComplaintsList.push(complaintData);
      localStorage.setItem("admin_complaints", JSON.stringify(adminComplaintsList));

      toast({
        title: "Complaint Submitted Successfully",
        description: "Your complaint has been submitted and will be reviewed by the authorities.",
      });
      
      navigate("/dashboard");
      setLoading(false);
    }, 1500);
  };

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
          <Link to="/dashboard">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Submit a Complaint</h2>
            <p className="text-muted-foreground">
              Report civic issues in your area and help improve your community
            </p>
          </div>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>Complaint Details</CardTitle>
              <CardDescription>
                Please provide detailed information about the issue you're reporting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address/Location</Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Enter the location of the issue"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Issue Category</Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the type of issue" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Provide a detailed description of the issue"
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Upload Image (Optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label htmlFor="image" className="cursor-pointer">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {selectedImage ? selectedImage.name : "Click to upload an image"}
                      </p>
                    </label>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Submitting Complaint..." : "Submit Complaint"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubmitComplaint;