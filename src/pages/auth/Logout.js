import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function Logout() {
  const navigate = useNavigate();
  const cookies = new Cookies(null, { path: "/" });
  cookies.remove("token");

  useEffect(() => {
    return navigate("/");
  }, [navigate]);
}

export default Logout;
