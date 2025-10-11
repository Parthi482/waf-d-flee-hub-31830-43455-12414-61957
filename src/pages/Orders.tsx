import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Product, CartItem, Order } from "@/types/product";
import { ShoppingCart, Plus, Minus, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

const Orders = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts);
      setProducts(parsedProducts);
    }
  }, []);

  const categories = ["ALL", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === "ALL" || p.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product, size?: 'mini' | 'regular') => {
    const existingItem = cart.find(
      item => item.id === product.id && item.size === size
    );

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, size }]);
    }
    toast.success(`${product.name} added to cart`);
  };

  const updateQuantity = (id: string, size: 'mini' | 'regular' | undefined, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id && item.size === size) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string, size: 'mini' | 'regular' | undefined) => {
    setCart(cart.filter(item => !(item.id === id && item.size === size)));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.size === 'mini' ? item.miniPrice : item.regularPrice;
      return total + (price || item.regularPrice) * item.quantity;
    }, 0);
  };

  const confirmOrder = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      const newOrder: Order = {
        id: Date.now().toString(),
        items: cart,
        total: getCartTotal(),
        date: new Date(),
        status: 'completed'
      };

      const savedOrders = localStorage.getItem('orders');
      const orders = savedOrders ? JSON.parse(savedOrders) : [];
      localStorage.setItem('orders', JSON.stringify([...orders, newOrder]));

      setCart([]);
      toast.success("Order confirmed successfully!");
    } catch (error) {
      console.error("Error confirming order:", error);
      toast.error("Failed to confirm order. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8">Order Management</h1>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-8">
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <Button
                  key={cat}
                  size="sm"
                  variant={selectedCategory === cat ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat)}
                  className={selectedCategory === cat ? "bg-gradient-primary" : ""}
                >
                  {cat}
                </Button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredProducts.map(product => (
                <Card key={product.id} className="shadow-card hover:shadow-glow transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base md:text-lg mb-1">{product.name}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground mb-3">{product.category}</p>
                        <div className="flex flex-wrap gap-2">
                          {product.miniPrice && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => addToCart(product, 'mini')}
                              className="text-xs md:text-sm"
                            >
                              Mini - ₹{product.miniPrice}
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addToCart(product, product.miniPrice ? 'regular' : undefined)}
                            className="text-xs md:text-sm"
                          >
                            Regular - ₹{product.regularPrice}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-4">
            <Card className="shadow-glow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <ShoppingCart className="w-5 h-5" />
                  Cart ({cart.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8 text-sm">Cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-3 max-h-[50vh] md:max-h-96 overflow-y-auto">
                      {cart.map((item, idx) => (
                        <div key={`${item.id}-${item.size}-${idx}`} className="border rounded-lg p-3 bg-secondary/20">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm truncate">{item.name}</p>
                              {item.size && (
                                <Badge variant="secondary" className="text-xs mt-1">
                                  {item.size}
                                </Badge>
                              )}
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeFromCart(item.id, item.size)}
                              className="h-8 w-8 p-0 ml-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 md:gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.size, -1)}
                                className="h-7 w-7 p-0"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.size, 1)}
                                className="h-7 w-7 p-0"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <p className="font-semibold text-sm">
                              ₹{((item.size === 'mini' ? item.miniPrice : item.regularPrice) || item.regularPrice) * item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4 space-y-3">
                      <div className="flex justify-between text-base md:text-lg font-bold">
                        <span>Total</span>
                        <span>₹{getCartTotal().toFixed(2)}</span>
                      </div>
                      <Button 
                        onClick={confirmOrder} 
                        className="w-full bg-gradient-primary hover:shadow-glow text-sm md:text-base"
                      >
                        Confirm Order
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
