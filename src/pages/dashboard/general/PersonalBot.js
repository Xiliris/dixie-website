import { useParams } from "react-router-dom";
import axios from "../../../axios";
import { useEffect, useState } from "react";
import PersonalBot from "./personal-bot/PersonalBot";
import PersonalBotLogin from "./personal-bot/PersonalBotLogin";

function ProtectedBot() {
  const { id } = useParams();
  const [page, setPage] = useState(<p>Loading</p>);

  useEffect(() => {
    async function authBot() {
      const response = await axios.get(`/client/auth/${id}`).catch((err) => {
        return setPage(<PersonalBotLogin />);
      });

      if (response && response.status === 200) {
        return setPage(<PersonalBot apperence={response.data} />);
      }
    }

    authBot();
  }, [id]);

  return page;
}
export default ProtectedBot;
