import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, ArrowLeft, Star } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";

export default function Wishlist() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            Save products you love to come back to later
          </p>
          <Button asChild className="bg-gradient-primary hover:opacity-90">
            <Link to="/shop">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Start Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Wishlist ({items.length})</h1>
        <Button variant="outline" onClick={clearWishlist}>
          Clear Wishlist
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-smooth overflow-hidden">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background text-red-500"
                onClick={() => removeFromWishlist(product.id)}
              >
                <Heart className="w-4 h-4 fill-current" />
              </Button>
            </div>
            
            <CardContent className="p-4">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                </h3>
              </Link>
              
              <Badge variant="outline" className="mb-2">
                {product.category}
              </Badge>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center gap-1 mb-3">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-xs text-muted-foreground">
                  ({product.reviews.length})
                </span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-primary">
                  ${product.price}
                </span>
                {product.stock === 0 && (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>

              <div className="space-y-2">
                <Button 
                  className="w-full bg-gradient-primary hover:opacity-90"
                  size="sm"
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full text-red-600 hover:text-red-700"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}