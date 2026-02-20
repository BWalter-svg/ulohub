import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../api/supabaseClient";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          console.log("AdminRoute: No user found");
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (error || !profile) {
          console.error("AdminRoute: Error fetching profile", error);
          setIsAdmin(false);
        } else {
          console.log("AdminRoute: Role found ->", profile.role);
          // Strict check for 'admin' string
          setIsAdmin(profile.role === "admin");
        }
      } catch (err) {
        console.error("AdminRoute: Unexpected error", err);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Verifying Admin Access...</p>
      </div>
    );
  }

  // If not an admin, send them to their respective dashboard instead of landing
  if (!isAdmin) {
    console.log("AdminRoute: Access Denied. Redirecting...");
    return <Navigate to="/landlord/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
