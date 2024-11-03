import react from "react";
import { Link } from "react-router-dom";

import CSG from "../imgs/csg-unija.svg";
import Unija from "../imgs/unija.svg";

import "./Partners.scss";

function Partners() {
  return (
    <section className="partners-content">
      {" "}
      <h2>Our founding partners</h2>
      <div className="partner">
        <Link to="/csg-unija">
          <img src={CSG} alt="CSG Unija" className="partner-img" />
        </Link>
        <Link to="/unija">
          <img src={Unija} alt="Unija" className="partner-img" />
        </Link>
        <Link to="/csg-unija">
          <img src={CSG} alt="CSG Unija" className="partner-img" />
        </Link>
        <Link to="/unija">
          <img src={Unija} alt="Unija" className="partner-img" />
        </Link>
      </div>
    </section>
  );
}

export default Partners;
