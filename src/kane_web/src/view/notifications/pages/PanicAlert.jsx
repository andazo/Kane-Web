import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../style/panicAlert.css";

export const PanicAlert = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [driver, setDriver] = useState({});
  const [costumer, setCostumer] = useState({});
  const [trip, setTrip] = useState({});
  const navigateTo = useNavigate();

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const driverInfo = props.information["idCabbie"];
    const costumerInfo = props.information["idCustomer"];
    const tripInfo = props.information["idTrip"];
    axios
      .get(
        "https://us-central1-kane-2023.cloudfunctions.net/app/retrieve/taxistas/" +
          driverInfo,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setDriver(response.data[0]);
      });

    axios
      .get(
        "https://us-central1-kane-2023.cloudfunctions.net/app/retrieve/customer/" +
          costumerInfo,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setCostumer(response.data[0]);
      });
    axios
      .get(
        "https://us-central1-kane-2023.cloudfunctions.net/app/retrieve/tripDetails/" +
          tripInfo,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setTrip(response.data);
      });

    const [latitude, longitude] = props.information["currentPosition"]
      .split(", ")
      .map(parseFloat);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: latitude,
            lng: longitude,
          });
        },
        (error) => {}
      );
      setShowModal(!showModal);
    }
  }, []);

  return (
    <>
      <Modal show={showModal} onHide={handleModalClose}>
        <div className="d-flex justify-content-center align-items-center mt-3">
          <i
            className="bi bi-exclamation-octagon-fill"
            style={{ fontSize: "3rem" }}
          ></i>
        </div>

        <Modal.Body className="mb-3">
          <p className="text-center">
            {props.information["isCustomer"]
              ? "Cliente " + costumer["name"]
              : "La taxista " + driver["name"] + " " + driver["surnames"]}{" "}
            ha presionado el botón de pánico en esta ubicación
          </p>
          {userLocation && (
            <div
              id="map"
              style={{ height: "250px" }}
              className="d-flex justify-content-center align-items-center"
            >
              <iframe
                title="User Location"
                width="60%"
                height="100%"
                frameBorder="0"
                src={`https://maps.google.com/maps?q=${userLocation.lat},${userLocation.lng}&z=15&output=embed`}
              />
            </div>
          )}

          <div className="text-center mt-3 mb-1">
            <Button
              variant="primary"
              style={{ backgroundColor: "#6F82A8" }}
              onClick={() =>
                navigateTo("/panic-details", {
                  state: {
                    latitude: userLocation.lat,
                    longitude: userLocation.lng,
                    driver: driver,
                    costumer: costumer,
                    trip: trip,
                    alert: props.information,
                  },
                })
              }
            >
              Ver viaje
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
