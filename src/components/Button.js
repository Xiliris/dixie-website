import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Button.scss";

function Button({ href, styleType, children, onClick, submit }) {
  const handleClick = (event) => {
    if (onClick) {
      event.preventDefault();
      onClick(event);
    }
  };

  if (submit) {
    return (
      <button
        type="submit"
        className={`btn ${styleType ? `btn-${styleType}` : ""}`}
        onClick={handleClick}
        aria-pressed="false"
      >
        {children}
      </button>
    );
  }

  return href ? (
    <Link to={href} className="btn-link">
      <button
        type="button"
        className={`btn ${styleType ? `btn-${styleType}` : ""}`}
        onClick={handleClick}
        aria-pressed="false"
      >
        {children}
      </button>
    </Link>
  ) : (
    <button
      type="button"
      className={`btn ${styleType ? `btn-${styleType}` : ""}`}
      onClick={handleClick}
      aria-pressed="false"
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  href: PropTypes.string,
  styleType: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  submit: PropTypes.bool,
};

Button.defaultProps = {
  href: "",
  styleType: "",
  onClick: null,
  submit: false,
};

export default Button;
