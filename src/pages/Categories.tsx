import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      const products = JSON.parse(savedProducts);
      const uniqueCategories = Array.from(new Set(products.map((p: any) => p.category)));
      const categoryList = uniqueCategories.map(name => ({
        id: name.toString(),
        name: name.toString()
      }));
      setCategories(categoryList);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingCategory) {
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
          const products = JSON.parse(savedProducts);
          const updatedProducts = products.map((p: any) => 
            p.category === editingCategory.name ? { ...p, category: categoryName } : p
          );
          localStorage.setItem('products', JSON.stringify(updatedProducts));
        }
        
        setCategories(categories.map(c => 
          c.id === editingCategory.id ? { ...c, name: categoryName } : c
        ));
        toast.success("Category updated successfully!");
      } else {
        const newCategory: Category = {
          id: categoryName,
          name: categoryName
        };
        setCategories([...categories, newCategory]);
        toast.success("Category added successfully!");
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("Failed to save category. Please try again.");
    }
  };

  const handleDelete = (id: string) => {
    try {
      const savedProducts = localStorage.getItem('products');
      if (savedProducts) {
        const products = JSON.parse(savedProducts);
        const hasProducts = products.some((p: any) => p.category === id);
        
        if (hasProducts) {
          toast.error("Cannot delete category with existing products");
          setDeleteId(null);
          return;
        }
      }
      
      setCategories(categories.filter(c => c.id !== id));
      toast.success("Category deleted successfully!");
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category. Please try again.");
      setDeleteId(null);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingCategory(null);
    setCategoryName("");
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold">Category Management</h1>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:shadow-glow">
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name *</Label>
                  <Input
                    id="name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-primary">
                  {editingCategory ? "Update Category" : "Add Category"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="shadow-card">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-base md:text-lg">All Categories</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {categories.map(category => (
                <div key={category.id} className="border rounded-lg p-4 hover:shadow-glow transition-all">
                  <h3 className="font-semibold text-base mb-3">{category.name}</h3>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(category)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setDeleteId(category.id)}
                      className="flex-1"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the category.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteId && handleDelete(deleteId)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

export default Categories;
