import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart, ShoppingCart, Star, Plus, Minus } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

export default function CustomerProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { getProduct } = useData();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  if (!id) return <Navigate to="/shop" />;

  const product = getProduct(id);
  if (!product) return <Navigate to="/shop" />;

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", variant: "destructive" as const };
    if (stock < 20) return { label: "Low Stock", variant: "warning" as const };
    return { label: "In Stock", variant: "success" as const };
  };

  const stockStatus = getStockStatus(product.stock);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
            <Badge 
              variant={stockStatus.variant}
              className="absolute top-4 left-4"
            >
              {stockStatus.label}
            </Badge>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground text-lg">{product.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{product.rating}</span>
            </div>
            <span className="text-muted-foreground">
              ({product.reviews.length} reviews)
            </span>
          </div>

          <div className="text-3xl font-bold text-primary">
            ${product.price}
          </div>

          <div className="text-sm text-muted-foreground">
            <span className="font-medium">{product.stock} units</span> available
          </div>

          {/* Quantity Selector */}
          {product.stock > 0 && (
            <div className="flex items-center gap-4">
              <label className="font-medium">Quantity:</label>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-gradient-primary text-white hover:opacity-90"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleWishlistToggle}
              className={isInWishlist(product.id) ? 'text-red-500' : ''}
            >
              <Heart className={`w-5 h-5 mr-2 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
              {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Customer Reviews ({product.reviews.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {product.reviews.length === 0 ? (
            <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
          ) : (
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div key={review.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.userName}</span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                  <Separator />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}