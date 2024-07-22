import "./Maintenance.scss"
import dix from "../imgs/dixie-graphics.png"
import transdix from "../imgs/dixie-graphics-2.png"
import ellipsa from "../imgs/ellipse-1.png";

function Maintenance() {
  return (
    <main id="Maintenance">
      <img src={dix} alt="dixie" className="dixie"/>
      <h1>
          <span className="intro">Hello. My name is</span> 
          <span className="name"> Dixie</span>.
        </h1>
      <p>Don't be sad. I'm coming soon.</p>
      <img src={transdix} alt="transdixie" className="transdixie" />
      <img src={ellipsa} alt="ellipsa" className="ellipsa e1" />
      <img src={ellipsa} alt="ellipsa" className="ellipsa e2" />
      <img src={ellipsa} alt="ellipsa" className="ellipsa e3" />
    </main>
  );
}

export default Maintenance;