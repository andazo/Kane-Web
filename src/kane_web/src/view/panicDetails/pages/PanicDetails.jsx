import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import "../styles/panic.css";

import axios from "axios";

export const PanicDetails = () => {
  const location = useLocation();
  const [userLocation, setUserLocation] = useState(null);
  const navigateTo = useNavigate();

  const solveAlert = () => {
    const data = { id: location.state.alert["id"], status: 2 };
    axios
      .put(
        "https://us-central1-kane-2023.cloudfunctions.net/app/update/updateStatusAlert",
        data, // Pasar el cuerpo directamente como segundo argumento
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        navigateTo("/home");
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: location.state.latitude,
            lng: location.state.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);

  return (
    <>
      <br />
      <Container>
        <h1 className="mb-3" style={{ color: "#6F82A8", textAlign: "left" }}>
          Detalles de alerta
        </h1>
        <br />
        <Row className="mt-3">
          <Col
            className="d-flex justify-content-center mb-0"
            style={{ paddingRight: 0 }}
          >
            <Card style={{ width: "30rem" }}>
              <Card.Body className="d-flex align-items-center">
                {userLocation && (
                  <div style={{ width: "100%", height: "100%" }}>
                    <iframe
                      title="User Location"
                      width="100%"
                      height="100%"
                      src={`https://maps.google.com/maps?q=${userLocation.lat},${userLocation.lng}&z=15&output=embed`}
                    />
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-0" style={{ paddingLeft: 0 }}>
            <Card style={{ width: "30rem" }}>
              <Card.Body className="d-flex align-items-center">
                <div
                  className="d-flex flex-column align-items-center"
                  style={{ marginRight: "2rem" }}
                >
                  <h4
                    style={{
                      textAlign: "center",
                      color: "#6F82A8",
                      marginBottom: "0.5rem",
                      fontSize: "22px",
                    }}
                  >
                    Conductora
                  </h4>
                  <img
                    src={location.state.driver["userPhoto"]}
                    className="margin-1"
                    alt={
                      "Foto de conductora: " +
                      location.state.driver["name"] +
                      " " +
                      location.state.driver["surnames"]
                    }
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginRight: "1rem",
                      marginLeft: "1rem",
                      marginBottom: "1rem",
                      marginTop: "1rem",
                    }}
                  />
                  <h5 style={{ textAlign: "center", fontSize: "18px" }}>
                    {location.state.driver["name"] +
                      " " +
                      location.state.driver["surnames"]}
                  </h5>
                </div>
                <div>
                  <Card.Text style={{ fontSize: "14px" }}>
                    <strong>Cédula</strong>
                    <br />
                    {location.state.driver["userId"]}
                    <br />
                    <strong>Placa</strong>
                    <br /> {location.state.driver["plateNumber"]}
                    <br />
                    <strong>Teléfono</strong>
                    <br />
                    {location.state.driver["phoneNumber"]}
                    <br />
                    <strong>Correo</strong>
                    <br />
                    {location.state.driver["email"]}
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
            <div style={{ height: "1rem" }}></div>
            <Card style={{ width: "30rem" }}>
              <Card.Body className="d-flex align-items-center">
                <div
                  className="d-flex flex-column align-items-center"
                  style={{ marginRight: "2rem" }}
                >
                  <h4
                    style={{
                      textAlign: "center",
                      color: "#6F82A8",
                      marginBottom: "0.5rem",
                      fontSize: "22px",
                    }}
                  >
                    Cliente
                  </h4>
                  <img
                    src={location.state.driver["userPhoto"]}
                    className="margin-1"
                    alt={"Foto de pasajero" + location.state.driver["name"]}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginRight: "1rem",
                      marginLeft: "1rem",
                      marginBottom: "1rem",
                      marginTop: "1rem",
                    }}
                  />
                  <h5 style={{ textAlign: "center", fontSize: "18px" }}>
                    {location.state.costumer["name"]}
                  </h5>
                </div>
                <div>
                  <Card.Text style={{ fontSize: "14px" }}>
                    <strong>Cédula</strong>
                    <br />
                    {location.state.costumer["userId"]}
                    <br />
                    <strong>Teléfono</strong>
                    <br />
                    {location.state.costumer["phoneNumber"]}
                    <br />
                    <strong>Correo</strong>
                    <br />
                    {location.state.costumer["email"]}
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="danger"
            onClick={() => {
              window.open("tel:911");
              solveAlert();
            }}
            className="custom-button"
          >
            Llamar al 911
          </Button>
        </div>
      </Container>
    </>
  );
};
