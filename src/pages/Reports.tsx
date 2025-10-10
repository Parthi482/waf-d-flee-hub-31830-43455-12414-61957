import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Order } from "@/types/product";
import { Calendar, TrendingUp, DollarSign, Package } from "lucide-react";

const Reports = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders);
      setOrders(parsedOrders);
      setFilteredOrders(parsedOrders);
    }
  }, []);

  const handleFilter = () => {
    if (!startDate || !endDate) {
      setFilteredOrders(orders);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const filtered = orders.filter(order => {
      const orderDate = new Date(order.date);
      return orderDate >= start && orderDate <= end;
    });

    setFilteredOrders(filtered);
  };

  const totalSales = filteredOrders
    .filter(o => o.status === 'completed')
    .reduce((sum, order) => sum + order.total, 0);

  const avgOrder = filteredOrders.length > 0 ? totalSales / filteredOrders.length : 0;

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Sales Reports</h1>
          <p className="text-muted-foreground">Analyze your sales performance and trends</p>
        </div>

        <Card className="mb-6 md:mb-8 shadow-glow border-primary/20">
          <CardHeader className="p-4 md:p-6 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Calendar className="w-5 h-5 text-primary" />
              Filter by Date Range
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date" className="text-sm font-medium">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date" className="text-sm font-medium">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="text-sm"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleFilter} className="w-full text-sm bg-gradient-primary">
                  Apply Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <Card className="shadow-card hover:shadow-glow transition-all border-primary/10">
            <CardHeader className="p-4 md:p-6 flex flex-row items-center justify-between">
              <CardTitle className="text-sm text-muted-foreground font-medium">Total Sales</CardTitle>
              <div className="p-2 rounded-full bg-primary/10">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <p className="text-2xl md:text-4xl font-bold text-primary">₹{totalSales.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-2">Revenue from completed orders</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-all border-accent/10">
            <CardHeader className="p-4 md:p-6 flex flex-row items-center justify-between">
              <CardTitle className="text-sm text-muted-foreground font-medium">Total Orders</CardTitle>
              <div className="p-2 rounded-full bg-accent/10">
                <Package className="w-5 h-5 text-accent" />
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <p className="text-2xl md:text-4xl font-bold">{filteredOrders.length}</p>
              <p className="text-xs text-muted-foreground mt-2">Orders in selected period</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-all border-primary/10">
            <CardHeader className="p-4 md:p-6 flex flex-row items-center justify-between">
              <CardTitle className="text-sm text-muted-foreground font-medium">Average Order</CardTitle>
              <div className="p-2 rounded-full bg-primary/10">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <p className="text-2xl md:text-4xl font-bold">₹{avgOrder.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-2">Per order value</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card border-primary/10">
          <CardHeader className="p-4 md:p-6 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground text-lg">No orders found for the selected period</p>
              </div>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 md:p-5 bg-gradient-to-r from-background to-secondary/20 hover:shadow-md transition-all">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                      <div>
                        <p className="font-bold text-base md:text-lg mb-1">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(order.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="font-bold text-xl md:text-2xl text-primary">₹{order.total.toFixed(2)}</p>
                        <p className={`text-sm font-semibold capitalize px-3 py-1 rounded-full inline-block ${
                          order.status === 'completed' ? 'bg-green-100 text-green-700' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {order.status}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 pt-3 border-t">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm gap-4 py-2 px-3 rounded bg-background/50">
                          <span className="flex-1 font-medium">{item.name} {item.size ? `(${item.size})` : ''}</span>
                          <span className="text-muted-foreground">x{item.quantity}</span>
                          <span className="font-semibold whitespace-nowrap">₹{((item.size === 'mini' ? item.miniPrice : item.regularPrice) || item.regularPrice) * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
