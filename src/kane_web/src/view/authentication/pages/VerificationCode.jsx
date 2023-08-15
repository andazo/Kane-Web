import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import CenteredModal from "../../shared/components/Modal";
import axios from "axios";

import "../styles/login.css";

export const VerificationCode = () => {
  const [code, setCode] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const previousEmail = location.state.email;
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "https://us-central1-kane-2023.cloudfunctions.net/app/recovery/verify",
        {
          email: previousEmail,
          otp: code,
          collection: "3",
        }
      )
      .then((response) => {
        navigate("/account/change-password", {
          state: { email: previousEmail },
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
          <h1>Código de verificación</h1>
          <p>
            Se acaba de enviar un correo electrónico con un código de
            verificación
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="otp"
              placeholder="Ingresar Código"
              onChange={(event) => setCode(event.target.value)}
            ></input>
            <CenteredModal
              title={"Código de verificación incorrecto"}
              body={
                "El código de verificación que has ingresado es incorrecto. Por favor, verifica que hayas ingresado el código correctamente y asegúrate de no omitir ningún carácter. "
              }
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            <input type="submit" value="Verificar"></input>
          </form>
        </div>
      </div>
    </>
  );
};
