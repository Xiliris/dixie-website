import { Helmet } from "react-helmet";

function Header({ title }) {
  return (
    <Helmet>
      <title>Dixie - {title ? title : "Discord Bot"}</title>
    </Helmet>
  );
}

export default Header;
