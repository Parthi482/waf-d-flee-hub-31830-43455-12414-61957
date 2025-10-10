import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const signUp = async (email: string, password: string, username?: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username || email.split('@')[0]
        }
      }
    });

    if (error) throw error;
    
    if (data.user) {
      toast.success("Account created successfully!");
      return { success: true, user: data.user };
    }
    
    return { success: false, error: "Failed to create account" };
  } catch (error: any) {
    toast.error(error.message || "Failed to create account");
    return { success: false, error: error.message };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    
    if (data.user) {
      toast.success("Login successful!");
      return { success: true, user: data.user };
    }
    
    return { success: false, error: "Invalid credentials" };
  } catch (error: any) {
    toast.error(error.message || "Invalid credentials");
    return { success: false, error: error.message };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    toast.success("Logged out successfully");
    return { success: true };
  } catch (error: any) {
    toast.error(error.message || "Failed to log out");
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    return null;
  }
};

export const getSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (error) {
    return null;
  }
};
