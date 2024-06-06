import "./PersonalBotLogin.scss";
import Navbar from "../../../../components/Navbar";
import Header from "../../../../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../../../../axios";
import Button from "../../../../components/Button";
import Cookies from "universal-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../managment/ToastCustomScss.scss";

function PersonalBotLogin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tokenError, setTokenError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies(null, { path: "/" });
  const userToken = cookies.get("token");

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    const token = e.target.elements.token.value;

    if (token.length < 59) {
      setTokenError("Invalid token!");
      toast.error("Invalid token!", {
        className: 'custom-toast-error'
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `/personal-bot/login`,
        {
          personalBotToken: token,
          guildId: id,
        },
        {
          headers: {
            token: userToken,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message, {
          className: "custom-toast",
        });
        setResponseMessage(response.data.message);
        navigate("/profile");
      }
    } catch (err) {
      setTokenError(err.message);
      toast.error(err.message, {
        className: "custom-toast-error",
      });
      setResponseMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Header title="Personal Bot Login" />
      <main className="personal-bot-login">
        <ToastContainer position="bottom-center" />
        <section className="bot-login">
          <h2>Bot Login</h2>
          <form onSubmit={onSubmitLogin}>
            <label htmlFor="token">
              Token
            </label>
            <input
              type="password"
              id="token"
              name="token"
              placeholder="Enter bot token"
              onChange={() => {
                setTokenError("");
                setResponseMessage("");
              }}
              aria-invalid={!!tokenError}
              aria-describedby="token-error"
            />
            <Button submit disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </form>
        </section>

        <section className="how-to">
          <h2>How to get bot token?</h2>
          <article>
            <div>
              <p>
                1. Go to{" "}
                <a
                  href="https://discord.com/developers/applications"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Discord Developer Portal
                </a>
                .
              </p>
              <p>2. Click on "New Application".</p>
              <p>3. Go to "Bot" section.</p>
              <p>4. Click on "Add Bot".</p>
              <p>5. Click on "Copy" to copy the token.</p>
            </div>

            <div>
              <h4>IMPORTANT TO ENABLE</h4>
              <p>1. Presence Intent</p>
              <p>2. Server Members Intent</p>
              <p>3. Message Content Intent</p>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}

export default PersonalBotLogin;
