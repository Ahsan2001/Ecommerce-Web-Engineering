import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, FolderOpen } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import CategoryDialog from "@/components/dialogs/CategoryDialog";
import DeleteConfirmDialog from "@/components/dialogs/DeleteConfirmDialog";
import { Category } from "@/data/dummyData";

export default function Categories() {
  const [searchTerm, setSearchTerm] = useState("");
  const { categories, addCategory, updateCategory, deleteCategory } = useData();
  
  // Dialog states
  const [categoryDialog, setCategoryDialog] = useState<{
    open: boolean;
    category?: Category;
  }>({ open: false });
  
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    category?: Category;
  }>({ open: false });

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    setCategoryDialog({ open: true });
  };

  const handleEditCategory = (category: Category) => {
    setCategoryDialog({ open: true, category });
  };

  const handleDeleteCategory = (category: Category) => {
    setDeleteDialog({ open: true, category });
  };

  const handleCategorySubmit = (categoryData: Omit<Category, 'id' | 'productCount'>) => {
    if (categoryDialog.category) {
      updateCategory(categoryDialog.category.id, categoryData);
    } else {
      addCategory(categoryData);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.category) {
      deleteCategory(deleteDialog.category.id);
      setDeleteDialog({ open: false });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Categories</h1>
          <p className="text-white mt-1">Manage your product categories</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 transition-smooth" onClick={handleAddCategory}>
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      <Card className="bg-gradient-card shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5" />
              Category List ({filteredCategories.length})
            </CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search categories..."
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
                  <TableHead>Category Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id} className="hover:bg-muted/50 transition-smooth">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FolderOpen className="w-5 h-5 text-primary" />
                        </div>
                        <span>{category.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-xs">
                      <p className="truncate">{category.description}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {category.productCount} products
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditCategory(category)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteCategory(category)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CategoryDialog
        open={categoryDialog.open}
        onOpenChange={(open) => setCategoryDialog({ open })}
        category={categoryDialog.category}
        onSubmit={handleCategorySubmit}
      />

      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open })}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        description="Are you sure you want to delete"
        itemName={deleteDialog.category?.name}
      />
    </div>
  );
}