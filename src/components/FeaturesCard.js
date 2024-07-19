import react from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




import "./FeaturesCard.scss";

function FeaturesCard(props) {
  return (
    <section className="card-container">
      <div className="card">
        <h3 className="card-title">{props.title}</h3>
        <div className="card-icon">
          <FontAwesomeIcon icon={props.icon} />
        </div>
        <p className="card-description">{props.description}</p>
      </div>
    </section>
  );
}

export default FeaturesCard;
