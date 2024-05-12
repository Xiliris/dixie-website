import { Link } from "react-router-dom";

import "./Errors.scss";
function Error() {
  return (
    <main id="errors">
      <h1>Error 404 (Not Found)</h1>
      <p>
        The page you are looking for does not exist. Please return to the home
        page.
      </p>
      <Link to="/" replace>
        <button>Back to home</button>
      </Link>
    </main>
  );
}

export default Error;
