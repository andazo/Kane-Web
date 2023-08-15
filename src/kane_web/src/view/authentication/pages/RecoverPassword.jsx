import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CenteredModal from "../../shared/components/Modal";
import axios from "axios";

import "../styles/login.css";

export const RecoverPassword = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "https://us-central1-kane-2023.cloudfunctions.net/app/recovery/generate",
        {
          email: inputEmail,
          collection: "3",
        }
      )
      .then((response) => {
        navigate("/account/verification-code", {
          state: { email: inputEmail },
        });
      })
      .catch((error) => {
        setModalShow(true);
      });
  };

  return (
    <>
      <div className="login-background">
        <div className="login-form">
          <h1>Recuperar Contraseña</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Correo electrónico"
              onChange={(event) => setInputEmail(event.target.value)}
            ></input>
            <CenteredModal
              title={"Dirección de correo electrónico inválida"}
              body={
                "Por favor, asegúrate de haber ingresado una dirección de correo electrónico válida. Verifica si hay errores de escritura y vuelve a intentarlo. "
              }
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            <input type="submit" value="Recuperar"></input>
          </form>
        </div>
      </div>
    </>
  );
};
