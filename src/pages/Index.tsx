import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, CheckCircle, Shield, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: FileText,
      title: "Report Issues",
      description: "Easily report civic problems like potholes, garbage, drainage issues, and more."
    },
    {
      icon: CheckCircle,
      title: "Track Progress",
      description: "Monitor the status of your complaints and see real-time updates on resolutions."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join thousands of citizens making their communities better, one report at a time."
    },
    {
      icon: Shield,
      title: "Admin Oversight",
      description: "Transparent administrative system ensures all issues are properly addressed."
    }
  ];

  const stats = [
    { number: "15,000+", label: "Issues Reported" },
    { number: "12,500+", label: "Issues Resolved" },
    { number: "50+", label: "Cities Connected" },
    { number: "95%", label: "Resolution Rate" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Civic Connect
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Crowdsourced Civic Issue Reporting & Resolution
          </Badge>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Making Communities Better,<br />One Report at a Time
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Report civic issues in your neighborhood and track their resolution. 
            Join thousands of citizens working together to improve their communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="text-lg px-8 py-6">
                Report an Issue
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Check Status
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">How Civic Connect Works</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform makes it easy for citizens to report issues and track their resolution
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-border/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community of engaged citizens and help make your neighborhood a better place to live.
          </p>
          <Link to="/signup">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Reporting Issues
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Civic Connect</span>
              </div>
              <p className="text-muted-foreground">
                Empowering communities through transparent civic issue reporting and resolution.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/login" className="block text-muted-foreground hover:text-foreground">
                  Login
                </Link>
                <Link to="/signup" className="block text-muted-foreground hover:text-foreground">
                  Sign Up
                </Link>
                <Link to="/admin" className="block text-muted-foreground hover:text-foreground">
                  Admin Portal
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>1-800-CIVIC-CONNECT</span>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Civic Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
