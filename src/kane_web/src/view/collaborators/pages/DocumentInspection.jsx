import { Gallery } from "../../profile/components/Gallery";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Loading } from "../../shared/components/Loading";
import { useNavigate } from "react-router";
import { ProfileInfo } from "../../profile/components/ProfileInfo";
import { ProfilePhoto } from "../../profile/components/ProfilePhoto";
import { PanicAlert } from "../../notifications/pages/PanicAlert";

import CenteredModal from "../../shared/components/Modal";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../profile/styles/profile.css";

export const DocumentInspection = (props) => {
  const { id } = useParams();
  const [driver, setDriver] = useState();
  const [loading, setLoading] = useState(true);
  const [taxi, setTaxi] = useState();
  const [alertInformation, setAlertInformation] = useState({});
  const [alert, setAlert] = useState(false);
  const navigateTo = useNavigate();

  const [bodyEmail, setBodyEmail] = useState("");
  const [status, setStatus] = useState("");

  const [modalSuccessShow, setModalSuccessShow] = useState(false);
  const [modalFailureShow, setModalFailureShow] = useState(false);


  const handleCloseModal = () => {
    setModalFailureShow(false);
    setModalSuccessShow(false);
    navigateTo("/collaborators/account-approval");
  };
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
      .catch((error) => {});
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
          setModalFailureShow(true);
        });
    }
  }, [driver]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(
        "https://us-central1-kane-2023.cloudfunctions.net/app/update/taxista-status",
        {
          id: driver._id,
          status: status,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then(props.setCheckRevisions(!props.checkRevisions))
      .then(
        await axios
          .post(
            "https://us-central1-kane-2023.cloudfunctions.net/app/utilities/sendEmail",
            {
              email: driver.email,
              subject: "Revisión de cuenta Kane-Taxi",
              body: "Hola " + driver.name + ",\n\nSu cuenta ha sido "+ (status == 1? "aprobada." : "rechazada.") + (bodyEmail.length > 0? "\n\nComentarios: \n" + bodyEmail : "") + "\n\n Saludos cordiales, \n\n[Kane Support]",
            },
            {
              headers: {
                "x-auth-token": localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {
            setModalSuccessShow(true);
          })
          .catch((error) => {
            setModalFailureShow(true);
          })
      )
      .catch((error) => {
        setModalFailureShow(true);
      });
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        {loading && <Loading />}
      </div>

      { (alert && !loading)  && <PanicAlert information={alertInformation} />}

      {!loading && (
        <>
          <h1 className="profile-h1">Revision de documentos</h1>
          <h2 className="profile-h2 d-flex justify-content-center">
            {" "}
            Datos conductora{" "}
          </h2>
          <div className="profile-container row align-items-center justify-content-center">
            <ProfilePhoto driver={driver} />
            <ProfileInfo driver={driver} />
          </div>
          <h2 className="profile-h2 d-flex justify-content-center">
            {" "}
            Documentos conductora{" "}
          </h2>
          <div className="imageContainer row gx-5 d-flex align-items-center justify-content-center">
            <div className="main-container d-flex justify-content-center gap-5 vh-50">
              <Gallery taxi={taxi} driver={driver} />
            </div>
            <p className="documentp d-flex justify-content-center">
              Dentro de los documentos adjuntos podremos encontar: Cédula,
              <br></br> hoja de delincuencia, licencia, póliza del INS, título
              de propiedad,
              <br></br> RITEVE, marchamo e imágenes del vehículo
            </p>

            <h4 className="comment-h4 d-flex justify-content-center">
              {" "}
              Comentario revisión{" "}
            </h4>
            <CenteredModal
              title={"El reporte fue enviado de forma exitosa"}
              body={
                "La revisión se envió correctamente y se notificó a la taxista mediante un correo"
              }
              show={modalSuccessShow}
              onHide={handleCloseModal}
            />
            <CenteredModal
              title={"Error"}
              body={"Se presentó un error a la hora enviar la revisión"}
              show={modalFailureShow}
              onHide={handleCloseModal}
            />
            <div className="textBox d-flex justify-content-center form-outline">
              <form onSubmit={handleSubmit}>
                <textarea
                  className="form-control p-5"
                  id="textAreaExample"
                  rows="4"
                  onChange={(event) => setBodyEmail(event.target.value)}
                ></textarea>
                <div className="buttons d-flex justify-content-center mt-2">
                  <button
                    onClick={() => setStatus(1)}
                    type="submit"
                    className="action_btn btn btn-success p-4"
                  >
                    Aprobar cuenta{" "}
                    <i className="fas fa-long-arrow-alt-right ms-1"></i>
                  </button>
                  <button
                    onClick={() => setStatus(0)}
                    type="submit"
                    className="action_btn btn btn-danger p-4"
                  >
                    Rechazar cuenta{" "}
                    <i className="fas fa-long-arrow-alt-right ms-1"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
