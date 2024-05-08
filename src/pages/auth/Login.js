import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "../../axios";

function Login() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const cookies = new Cookies(null, { path: "/" });
  const code = params.get("code");
  console.log(code);

  useEffect(() => {
    async function login() {
      const { data, status } = await axios.get(`/auth/?code=${code}`);
      if (status === 200) {
        await cookies.set("token", data.token, { path: "/" });
        return navigate("/");
      } else {
        navigate("/error401");
      }

      console.log(data, status);
    }

    login();
  }, []);

  return null;
}

export default Login;
