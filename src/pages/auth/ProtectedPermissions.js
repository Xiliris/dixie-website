import { useParams, useNavigate } from "react-router-dom";
import getGuildPermissions from "../../modules/guildPermissions";

function ProtectedPermissions({ children }) {
  const navigate = useNavigate();
  const { id } = useParams();

  async function checkPermissions() {
    const permissions = await getGuildPermissions(id);
    if (!permissions) return navigate("/error/403");
  }
  checkPermissions();

  return children;
}

export default ProtectedPermissions;
