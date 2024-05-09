import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";

function ProtectedAuth({ children }) {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");

  if (!token || token === null || token === undefined) {
    return <Navigate to="/error/401" replace />;
  }

  return children;
}

export default ProtectedAuth;
