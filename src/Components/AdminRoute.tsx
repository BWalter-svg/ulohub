const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ADD THIS LINE
  alert("AdminRoute is actually running!"); 
  
  const [status, setStatus] = useState({ loading: true, isAdmin: false, reason: "Init" });
  // ... rest of the code
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../api/supabaseClient";

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<{loading: boolean; isAdmin: boolean; reason: string}>({
    loading: true,
    isAdmin: false,
    reason: "Initializing"
  });

  useEffect(() => {
    async function check() {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setStatus({ loading: false, isAdmin: false, reason: "No active session/user found" });
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error) {
        setStatus({ loading: false, isAdmin: false, reason: `DB Error: ${error.message}` });
        return;
      }

      if (profile?.role !== 'admin') {
        setStatus({ loading: false, isAdmin: false, reason: `Role is ${profile?.role}, not admin` });
        return;
      }

      setStatus({ loading: false, isAdmin: true, reason: "Success" });
    }
    check();
  }, []);

  if (status.loading) return <div className="p-10 text-center">Verifying: {status.reason}...</div>;

  if (!status.isAdmin) {
    console.error("🛑 ADMIN ACCESS DENIED:", status.reason);
    // Use an alert so you can see it on mobile/without console
    // window.alert(`Access Denied: ${status.reason}`); 
    return <Navigate to="/landlord/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
