import { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";

function AdminAuth() {
  const [isAuth, setIsAuth] = useState(false);

  return isAuth ? (
    <AdminDashboard setIsAuth={setIsAuth} />
  ) : (
    <AdminLogin setIsAuth={setIsAuth} />
  );
}

export default AdminAuth;