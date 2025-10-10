import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Shield } from "lucide-react";

export const CreateAdminButton = () => {
  const [isCreating, setIsCreating] = useState(false);

  const createAdminUser = async () => {
    setIsCreating(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-admin-user');
      
      if (error) throw error;
      
      toast.success("Admin user created successfully! Email: admin@gmail.com, Password: admin@123");
    } catch (error: any) {
      toast.error(error.message || "Failed to create admin user");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Button
      onClick={createAdminUser}
      disabled={isCreating}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      <Shield className="w-4 h-4" />
      {isCreating ? "Creating..." : "Create Admin User"}
    </Button>
  );
};
