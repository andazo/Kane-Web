import { ProfilePhoto } from "../components/ProfilePhoto";
import { ProfileInfo } from "../components/ProfileInfo";
import { Gallery } from "../components/Gallery";
import { useParams } from "react-router-dom";
import { Loading } from "../../shared/components/Loading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PanicAlert } from "../../notifications/pages/PanicAlert";

import CenteredModal from "../../shared/components/Modal";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/profile.css";

export const Profile = () => {
  const { id } = useParams();
  const navigateTo = useNavigate();

  const [modalShow, setModalShow] = useState(false);
  const [driver, setDriver] = useState();
  const [taxi, setTaxi] = useState();
  const [loading, setLoading] = useState(true);
  const [alertInformation, setAlertInformation] = useState({});
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://us-central1-kane-2023.cloudfunctions.net/app/retrieve/alertsByStatus/1",
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if (response.data.length > 0) {
          setAlertInformation(response.data[0]);
          setAlert(!alert);
        }
      })
      .catch((error) => {
        setModalShow(!modalShow);
      });

    axios
      .get(
        "https://us-central1-kane-2023.cloudfunctions.net/app/retrieve/taxistas/" +
          id,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setDriver(response.data[0]);
      })
      .catch((error) => {
        setModalShow(!modalShow);
      });
  }, []);

  useEffect(() => {
    if (!!driver) {
      axios
        .get(
          "https://us-central1-kane-2023.cloudfunctions.net/app/retrieve/taxisByPlateNumber/" +
            driver.plateNumber,
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          setTaxi(response.data[0]);

          setTimeout(() => {
            setLoading(false);
          }, 100);
        })
        .catch((error) => {
          setModalShow(!modalShow);
        });
    }
  }, [driver]);

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        {loading && <Loading />}
      </div>

      {(alert && !loading)  && <PanicAlert information={alertInformation} />}

      {!loading && (
        <>
          <h1 className="profile-h1">Perfil</h1>
          <h2 className="profile-h2 d-flex justify-content-center">
            Datos personales
          </h2>
          <div className="profile-container row align-items-center justify-content-center">
            <ProfilePhoto driver={driver} />
            <ProfileInfo driver={driver} />
          </div>
          <h2 className="profile-h2 d-flex justify-content-center">
            Documentos
          </h2>
          <div className="main-container d-flex justify-content-center gap-5">
            <Gallery taxi={taxi} driver={driver} />
          </div>
        </>
      )}
      <CenteredModal
        title={"Ha ocurrido un error"}
        body={
          "Un error inesperado ha ocurrido, por favor inicie sesión nuevamente"
        }
        show={modalShow}
        onHide={() => {
          setModalShow(!modalShow);
          navigateTo("/account/login");
        }}
      />
    </>
  );
};
