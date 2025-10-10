import { supabase } from "@/integrations/supabase/client";

type UserRole = 'admin' | 'moderator' | 'user';

export const checkUserRole = async (role: UserRole): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', role)
      .maybeSingle();

    if (error) return false;
    return !!data;
  } catch {
    return false;
  }
};

export const getUserRoles = async (): Promise<string[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id);

    if (error) return [];
    return data.map(r => r.role);
  } catch {
    return [];
  }
};
