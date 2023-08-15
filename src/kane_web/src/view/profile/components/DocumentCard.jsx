import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "../styles/documentCard.css";

import { useParams, useNavigate } from "react-router-dom";

export const DocumentCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const navigateToDocs = () => {
    navigate(`/profile/${id}/docs`);
  };

  return (
    <>
      <div className="card card-size">
        <img
          className="card-img-top mx-auto d-bloc"
          src="https://i.ibb.co/vLrBKqW/id.png"
          alt="personal docs"
        />
        <div className="card-body">
          <h5 className="card-title d-flex justify-content-center">
            Personales
          </h5>
          <p className="card-text d-flex justify-content-center text-center">
            Cédula, hoja de delincuencia, licencia, y póliza del INS
          </p>
          <a
            className="btn btn-primary d-flex justify-content-center"
            onClick={navigateToDocs}
          >
            Ver documentos
          </a>
        </div>
      </div>
    </>
  );
};