import sad_lego from "./sad_lego.jpg";
import "./Error404.css";

const Error404 = () => (
  <>
    <div className="container">
      <div className="error404">
        <h3>Erreur 404</h3>
        <h5>Page non trouvée</h5>
        <img
          className="sad_lego-img"
          src={sad_lego}
          alt={"Erreur 404 Page non disponible"}
        />
      </div>
    </div>
  </>
);

export default Error404;
