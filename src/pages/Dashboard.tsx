import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, ShoppingBag, Package, TrendingUp, Calendar } from "lucide-react";
import { Order } from "@/types/product";

const Dashboard = () => {
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
  
  const totalOrders = filteredOrders.length;
  const completedOrders = filteredOrders.filter(o => o.status === 'completed').length;

  const stats = [
    {
      title: "Total Sales",
      value: `₹${totalSales.toFixed(2)}`,
      icon: DollarSign,
      description: "Total revenue generated"
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      description: "All time orders"
    },
    {
      title: "Completed Orders",
      value: completedOrders,
      icon: Package,
      description: "Successfully fulfilled"
    },
    {
      title: "Average Order",
      value: totalOrders > 0 ? `₹${(totalSales / completedOrders || 0).toFixed(2)}` : "₹0",
      icon: TrendingUp,
      description: "Per order value"
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8">Dashboard Overview</h1>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="shadow-card hover:shadow-glow transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 md:p-6">
                  <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0">
                  <div className="text-xl md:text-3xl font-bold truncate">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1 hidden md:block">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="shadow-card">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-base md:text-lg">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            {filteredOrders.length === 0 ? (
              <p className="text-muted-foreground text-center py-8 text-sm">No orders found</p>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {filteredOrders.slice(-5).reverse().map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-3 md:p-4 rounded-lg bg-secondary/30"
                  >
                    <div>
                      <p className="font-semibold text-sm md:text-base">Order #{order.id.slice(0, 8)}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {order.items.length} items
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-semibold text-sm md:text-base">₹{order.total.toFixed(2)}</p>
                      <p className={`text-xs md:text-sm capitalize ${
                        order.status === 'completed' ? 'text-green-600' :
                        order.status === 'pending' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {order.status}
                      </p>
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

export default Dashboard;
