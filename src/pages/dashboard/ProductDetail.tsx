import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Star, Calendar, User, Edit, Package } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import ProductDialog from "@/components/dialogs/ProductDialog";
import { useState } from "react";
import { Product } from "@/data/dummyData";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { products, updateProduct } = useData();
  const product = products.find(p => p.id === id);
  
  const [editDialog, setEditDialog] = useState(false);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white  mb-2">Product Not Found</h2>
          <p className="text-white mb-4">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/dashboard/products" className="text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", variant: "destructive" as const };
    if (stock < 20) return { label: "Low Stock", variant: "warning" as const };
    return { label: "In Stock", variant: "success" as const };
  };

  const stockStatus = getStockStatus(product.stock);

  const handleEditProduct = () => {
    setEditDialog(true);
  };

  const handleProductUpdate = (productData: Omit<Product, 'id' | 'createdAt' | 'reviews'>) => {
    updateProduct(product.id, productData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link to="/dashboard/products" className="text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gradient-card shadow-md">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Package className="w-6 h-6" />
                    {product.name}
                  </CardTitle>
                  <p className="text-white mt-2">{product.description}</p>
                </div>
                <Button className="bg-gradient-primary hover:opacity-90 transition-smooth" onClick={handleEditProduct}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Product
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-lg bg-muted"
                  />
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-white">Price</p>
                      <p className="text-2xl font-bold text-primary">${product.price}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Stock</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xl font-semibold">{product.stock}</p>
                        <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Category</p>
                      <Badge variant="outline" className="mt-1">{product.category}</Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Rating</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{product.rating}</span>
                        <span className="text-white">
                          ({product.reviews.length} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Created</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-white" />
                      <span>{new Date(product.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews Section */}
          <Card className="bg-gradient-card shadow-md">
            <CardHeader>
              <CardTitle>Customer Reviews ({product.reviews.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {product.reviews.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-white">No reviews yet</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {product.reviews.map((review, index) => (
                    <div key={review.id}>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-medium">{review.userName}</h4>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-white">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-white">{review.comment}</p>
                        </div>
                      </div>
                      {index < product.reviews.length - 1 && <Separator className="mt-6" />}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="bg-gradient-card shadow-md">
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-white">Total Reviews</span>
                <span className="font-medium">{product.reviews.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Average Rating</span>
                <span className="font-medium">{product.rating}/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Stock Level</span>
                <span className="font-medium">{product.stock} units</span>
              </div>
            </CardContent>
          </Card>
          
        </div>
      </div>

      {/* Edit Dialog */}
      <ProductDialog
        open={editDialog}
        onOpenChange={setEditDialog}
        product={product}
        onSubmit={handleProductUpdate}
      />
    </div>
  );
}