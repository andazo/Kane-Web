import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../shared/components/Loading";

import CenteredModal from "../../shared/components/Modal";
import axios from "axios";

import kaneWebLogo from "../../shared/assets/kane-logo.png";
import "../styles/login.css";

export const Login = () => {
  const initialValues = { email: "", password: "", username: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const userData = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
    };
    setFormErrors(validate(formValues));
    axios
      .post(
        "https://us-central1-kane-2023.cloudfunctions.net/app/login/web",
        userData
      )
      .then((response) => {
        localStorage.setItem("token", response.data["token"]);
        localStorage.setItem("id", response.data["id"]);
        navigateTo("/home");
      })
      .catch((error) => {
        setModalShow(true);
      });
  }

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Ingrese su correo electrónico";
    } else if (!regex.test(values.email)) {
      errors.email = "Formato de correo inválido";
    }
    if (!values.password) {
      errors.password = "Ingrese su contraseña";
    }
    return errors;
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        {loading && <Loading />}
      </div>
      <div className="login-background">
        <div className="login-form">
          <div className="logo-details">
            <img className="logo-image" src={kaneWebLogo}></img>
          </div>
          <h1>Kãnè Taxi</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Correo electrónico"
              value={formValues.email}
              onChange={handleChange}
            ></input>
            <p className="errorMessage">{formErrors.email}</p>

            <div className="password-container d-flex">
              <div className="mr-auto">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </div>
              <div className="ml-auto">
                <i
                  className={
                    visible ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"
                  }
                  onClick={() => setVisible(!visible)}
                ></i>
              </div>
            </div>
            <p className="errorMessage">{formErrors.password}</p>
            <CenteredModal
              title={"Credenciales de ingreso incorrectas"}
              body={
                "Las credenciales de verificaciones que has ingresado son incorrectas. Por favor, verifica que hayas ingresado los datos correctos. "
              }
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            <input type="submit" value="Ingresar"></input>
          </form>
          <p
            className="redirect"
            onClick={() => navigateTo("/account/recover-password")}
          >
            ¿Olvidaste tu contraseña?
          </p>
        </div>
      </div>
    </>
  );
};
