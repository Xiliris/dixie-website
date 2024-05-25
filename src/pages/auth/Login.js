import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "../../axios";

function Login() {
  const navigate = useNavigate();
  const cookies = new Cookies(null, { path: "/" });
  const [params] = useSearchParams();
  const code = params.get("code");

  useEffect(() => {
    async function login() {
      if (!code) return navigate("/error/401");

      const { data, status } = await axios.get(`/auth/?code=${code}`);
      if (status === 200) {
        await cookies.set("token", data.token, { path: "/" });
        return navigate("/");
      } else {
        navigate("/error401");
      }
    }

    login();
  }, []);

  return null;
}

export default Login;
