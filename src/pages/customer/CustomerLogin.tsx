import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCustomerAuth } from "@/contexts/CustomerAuthContext";
import { toast } from "@/hooks/use-toast";
import { Store, Loader2 } from "lucide-react";

export default function CustomerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, customer, isLoading } = useCustomerAuth();
  const navigate = useNavigate();

  if (customer) {
    return <Navigate to="/shop" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Welcome back!",
        description: "Successfully logged in",
      });
      navigate('/shop');
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30 p-4">
      <Card className="w-full max-w-md bg-gradient-card shadow-elegant">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Store className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
            Welcome to ShopHub
          </CardTitle>
          <CardDescription>
            Sign in to your account to start shopping
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:opacity-90 transition-smooth"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link 
                to="/customer/signup" 
                className="text-primary font-medium hover:underline"
              >
                Sign up here
              </Link>
            </p>
          </div>
          <div className="mt-4 text-center">
            <Link 
              to="/login" 
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Admin Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}