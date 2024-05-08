import Cookies from "universal-cookie";

import Navbar from "../../components/Navbar";
import { useEffect } from "react";

require("./Servers.scss");

function Servers() {
  const cookies = new Cookies(null, { path: "/" });

  useEffect(() => {}, []);

  return (
    <>
      <Navbar />
      <div id="servers">
        <h1>Please select a server</h1>
        <section></section>
      </div>
    </>
  );
}

export default Servers;
