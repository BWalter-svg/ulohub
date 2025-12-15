import React, { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../api/supabaseClient";

interface Props {
  children: ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setAuthenticated(!!user);
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) return <p>Loading...</p>; // or a spinner

  if (!authenticated) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default PrivateRoute;


