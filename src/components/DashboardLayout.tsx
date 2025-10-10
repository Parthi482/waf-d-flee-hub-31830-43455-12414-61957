import { ReactNode, useEffect } from "react";
import * as React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { signOut } from "@/lib/supabase-auth";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, Package, ShoppingCart, LogOut, FolderTree, Users, Menu, X } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  useEffect(() => {
    let isMounted = true;

    // Initial check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isMounted && !session?.user) {
        navigate("/login", { replace: true });
      }
    });

    // Listen for sign out events only
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        navigate("/login", { replace: true });
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/dashboard/reports", icon: FileText, label: "Reports" },
    { path: "/dashboard/catalogue", icon: Package, label: "Catalogue" },
    { path: "/dashboard/categories", icon: FolderTree, label: "Categories" },
    { path: "/dashboard/orders", icon: ShoppingCart, label: "Orders" },
    { path: "/dashboard/users", icon: Users, label: "Users" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-sidebar border border-sidebar-border"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen
        fixed lg:sticky top-0 z-40 transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            WAF-D-FLE
          </h1>
          <p className="text-sm text-sidebar-foreground/70">Admin Dashboard</p>
        </div>
        
        <nav className="px-3 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-background lg:ml-0">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
