import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Package, ArrowLeft } from "lucide-react";

export default function OrderSuccess() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto text-center">
        <Card className="bg-gradient-card shadow-elegant">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-500" />
            </div>
            
            <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase. Your order has been confirmed and will be processed shortly.
            </p>
            
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Package className="w-4 h-4" />
                <span>Order #: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button asChild className="w-full bg-gradient-primary hover:opacity-90">
                <Link to="/shop">
                  Continue Shopping
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="w-full">
                <Link to="/shop">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Shop
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}