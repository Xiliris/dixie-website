import { Link } from "react-router-dom";

import "./Errors.scss";
function Error403() {
  return (
    <main id="errors">
      <h1>Error 403 (Forbidden)</h1>
      <p>
        You are not authorized to view this page. Please return to the home
        page.
      </p>
      <Link to="/" replace>
        <button>Back to home</button>
      </Link>
    </main>
  );
}

export default Error403;
