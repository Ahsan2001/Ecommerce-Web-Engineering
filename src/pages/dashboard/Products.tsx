import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, Eye, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import ProductDialog from "@/components/dialogs/ProductDialog";
import DeleteConfirmDialog from "@/components/dialogs/DeleteConfirmDialog";
import { Product } from "@/data/dummyData";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  
  // Dialog states
  const [productDialog, setProductDialog] = useState<{
    open: boolean;
    product?: Product;
  }>({ open: false });
  
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    product?: Product;
  }>({ open: false });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", variant: "destructive" as const };
    if (stock < 20) return { label: "Low Stock", variant: "warning" as const };
    return { label: "In Stock", variant: "success" as const };
  };

  const handleAddProduct = () => {
    setProductDialog({ open: true });
  };

  const handleEditProduct = (product: Product) => {
    setProductDialog({ open: true, product });
  };

  const handleDeleteProduct = (product: Product) => {
    setDeleteDialog({ open: true, product });
  };

  const handleProductSubmit = (productData: Omit<Product, 'id' | 'createdAt' | 'reviews'>) => {
    if (productDialog.product) {
      updateProduct(productDialog.product.id, productData);
    } else {
      addProduct(productData);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.product) {
      deleteProduct(deleteDialog.product.id);
      setDeleteDialog({ open: false });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your product inventory</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 transition-smooth" onClick={handleAddProduct}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Card className="bg-gradient-card shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Product List ({filteredProducts.length})
            </CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock);
                  return (
                    <TableRow key={product.id} className="hover:bg-muted/50 transition-smooth">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover bg-muted"
                          />
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground truncate max-w-32">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">${product.price}</TableCell>
                      <TableCell>{product.stock} units</TableCell>
                      <TableCell>
                        <Badge variant={stockStatus.variant}>
                          {stockStatus.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span>{product.rating}</span>
                          <span className="text-muted-foreground">
                            ({product.reviews.length})
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                          >
                            <Link to={`/dashboard/products/${product.id}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteProduct(product)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <ProductDialog
        open={productDialog.open}
        onOpenChange={(open) => setProductDialog({ open })}
        product={productDialog.product}
        onSubmit={handleProductSubmit}
      />

      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open })}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        description="Are you sure you want to delete"
        itemName={deleteDialog.product?.name}
      />
    </div>
  );
}