import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product } from "@/types/product";
import { defaultProducts } from "@/lib/defaultProducts";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Catalogue = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    miniPrice: "",
    regularPrice: "",
    image: "",
    description: ""
  });

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(defaultProducts);
      localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
  }, []);

  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.name,
      category: formData.category,
      miniPrice: formData.miniPrice ? parseFloat(formData.miniPrice) : undefined,
      regularPrice: parseFloat(formData.regularPrice),
      image: formData.image || undefined,
      description: formData.description || undefined
    };

    if (editingProduct) {
      const updated = products.map(p => p.id === editingProduct.id ? newProduct : p);
      saveProducts(updated);
      toast.success("Product updated successfully!");
    } else {
      saveProducts([...products, newProduct]);
      toast.success("Product added successfully!");
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    saveProducts(products.filter(p => p.id !== id));
    toast.success("Product deleted successfully!");
    setDeleteId(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      miniPrice: product.miniPrice?.toString() || "",
      regularPrice: product.regularPrice.toString(),
      image: product.image || "",
      description: product.description || ""
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "",
      miniPrice: "",
      regularPrice: "",
      image: "",
      description: ""
    });
  };

  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold">Catalogue Management</h1>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:shadow-glow">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="miniPrice">Mini Price (optional)</Label>
                    <Input
                      id="miniPrice"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.miniPrice}
                      onChange={(e) => setFormData({ ...formData, miniPrice: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regularPrice">Regular Price *</Label>
                    <Input
                      id="regularPrice"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.regularPrice}
                      onChange={(e) => setFormData({ ...formData, regularPrice: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Product Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData({ ...formData, image: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="w-32 h-32 object-cover rounded-lg mt-2" />
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-primary">
                  {editingProduct ? "Update Product" : "Add Product"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-6 md:space-y-8">
          {categories.map(category => (
            <Card key={category} className="shadow-card">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-base md:text-lg">{category}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {products.filter(p => p.category === category).map(product => (
                    <div key={product.id} className="border rounded-lg p-3 md:p-4 hover:shadow-glow transition-all">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-32 md:h-40 object-cover rounded-lg mb-3"
                        />
                      )}
                      <h3 className="font-semibold text-sm md:text-base mb-2">{product.name}</h3>
                      <div className="text-xs md:text-sm mb-3">
                        {product.miniPrice && (
                          <p className="text-muted-foreground">Mini: ₹{product.miniPrice}</p>
                        )}
                        <p className="text-muted-foreground">Regular: ₹{product.regularPrice}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(product)}
                          className="flex-1 text-xs md:text-sm"
                        >
                          <Edit className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setDeleteId(product.id)}
                          className="flex-1 text-xs md:text-sm"
                        >
                          <Trash2 className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the product.
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

export default Catalogue;
