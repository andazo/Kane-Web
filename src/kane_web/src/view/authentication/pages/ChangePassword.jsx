import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import CenteredModal from "../../shared/components/Modal";
import axios from "axios";
import kaneWebLogo from "../../shared/assets/kane-logo.png";

import "../styles/Changepsswrd.css";

export const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const location = useLocation();
  const previousEmail = location.state.email;
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("La nueva contraseña y la confirmación no coinciden");
      return;
    }

    await axios
      .post(
        "https://us-central1-kane-2023.cloudfunctions.net/app/recovery/update-password",
        {
          email: previousEmail,
          password: newPassword,
          collection: "3",
        }
      )
      .then(() => {
        setModalShow(true);
      })
      .catch((error) => {
        alert("Hubo un error cambiando la contraseña.");
      });
  };

  return (
    <>
      <div className="-background">
        <div className="login-form">
          <div className="logo-details">
            <img className="logo-image" src={kaneWebLogo}></img>
          </div>

          <h3 className="-h1">Cambio de contraseña</h3>
          <CenteredModal
            title={"Cambio de contraseña exitoso"}
            body={"La contraseña se cambió correctamente"}
            show={modalShow}
            onHide={() => navigate("/account/login")}
          />
          <form onSubmit={handleSubmit}>
            <div className="password-container d-flex">
              <input
                className="password-input"
                type={visible ? "text" : "password"}
                name="password"
                placeholder="Nueva contraseña"
                value={newPassword} // Vincula el valor del estado newPassword al valor del input
                onChange={(event) => setNewPassword(event.target.value)} // Actualiza el valor de newPassword cuando se escribe en el input
              />
              <i
                className={visible ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}
                onClick={() => setVisible(!visible)}
              ></i>
            </div>

            <div className="password-container d-flex">
              <input
                className="password-input"
                type={visible ? "text" : "password"}
                name="password"
                placeholder=" Confirme contraseña"
                value={confirmNewPassword} // Vincula el valor del estado confirmNewPassword al valor del input
                onChange={(event) => setConfirmNewPassword(event.target.value)} // Actualiza el valor de confirmNewPassword cuando se escribe en el input
              />
              <i
                className={visible ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}
                onClick={() => setVisible(!visible)}
              ></i>
            </div>

            <button className="-button" type="submit">
              Cambiar contraseña
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
