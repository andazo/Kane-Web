import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CollaboratorsList } from "../../collaborators/Components/CollaboratorsList";
import { Loading } from "../../shared/components/Loading";
import { PanicAlert } from "../../notifications/pages/PanicAlert";

import CenteredModal from "../../shared/components/Modal";
import axios from "axios";

import "../styles/home.css";

export const Home = () => {
  const [activeCollaborators, setActiveCollaborators] = useState(0);
  const [amountUsers, setAmountUsers] = useState(0);
  const [dayDriver, setDayDriver] = useState({});
  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [alertInformation, setAlertInformation] = useState({});
  const [alert, setAlert] = useState(false);
  const navigateTo = useNavigate();

  const numberOfRows = 5;

  const columns = [
    {
      name: "Cédula",
      selector: (row) => row.userId,
      sortable: true,
      width: "120px",
    },
    {
      name: "Nombre",
      selector: (row) => row.name + " " + row.surnames,
      sortable: true,
    },
    {
      name: "Correo electrónico",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.status.description,
      sortable: true,
      width: "130px",
    },
  ];

  const fetchData = (url) => {
    return axios.get(url, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
  };

  useEffect(() => {
    const retrieveAlerts = () => {
      fetchData(
        "https://us-central1-kane-2023.cloudfunctions.net/app/retrieve/alertsByStatus/1"
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
    };

    const retrieveCollaborators = () => {
      fetchData(
        "https://us-central1-kane-2023.cloudfunctions.net/app/retrieve/taxistas"
      )
        .then((response) => {
          setCollaborators(response.data);
        })
        .catch((error) => {
          setModalShow(!modalShow);
        });
    };

    const retrieveUserCount = () => {
      fetchData(
        "https://us-central1-kane-2023.cloudfunctions.net/app/retrieve/customerCount"
      )
        .then((response) => {
          setAmountUsers(response.data["count"]);
        })
        .catch((error) => {
          setModalShow(!modalShow);
        });
    };

    const retrieveActiveCollaboratorsCount = () => {
      fetchData(
        "https://us-central1-kane-2023.cloudfunctions.net/app/retrieve/taxistascountByStatus/1"
      )
        .then((response) => {
          setActiveCollaborators(response.data["count"]);
        })
        .catch((error) => {
          setModalShow(!modalShow);
        });
    };

    const retrieveMostTripsToday = () => {
      fetchData(
        "https://us-central1-kane-2023.cloudfunctions.net/app/retrieve/mostTripsToday"
      )
        .then((response) => {
          setDayDriver(response.data);
        })
        .catch((error) => {
          setModalShow(!modalShow);
        });
    };

    retrieveAlerts();
    retrieveCollaborators();
    retrieveUserCount();
    retrieveActiveCollaboratorsCount();
    retrieveMostTripsToday();

    setTimeout(() => {
      setLoading(!loading);
    }, 500);
  }, []);

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        {loading && <Loading />}
      </div>

      {alert && !loading && <PanicAlert information={alertInformation} />}

      {!loading && (
        <>
          <div className="row d-flex justify-content-center">
            <div className="col-sm-7">
              <div className="row d-flex justify-content-center">
                <div className="col-xl-4 col-lg-5">
                  <div className="card card-style">
                    <div className="card-body">
                      <h5 className="card-title text-center text-style">
                        Taxistas activas
                      </h5>
                      <h1 className="mt-3 mb-1 mx-3 text-center text-style">
                        <b>{activeCollaborators}</b>
                      </h1>
                    </div>
                  </div>
                  <br />
                  <div className="card card-style ">
                    <div className="card-body">
                      <h5 className="card-title text-center text-style">
                        Clientes
                      </h5>
                      <h1 className="mt-3 mb-1 mx-3 text-center text-style">
                        <b> {amountUsers} </b>
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="card card-style h-100 justify-content-center">
                    <div className="body">
                      <h5 className="card-title text-center text-style">
                        Taxista con más viajes recientemente
                      </h5>
                      <img
                        src={dayDriver["userPhoto"]}
                        className="mt-2 mb-2 rounded-circle mx-auto d-flex prof-photo"
                        alt={dayDriver["name"] + " " + dayDriver["surnames"]}
                      />
                      <h5 className="card-title text-center text-style">
                        {dayDriver["name"] + " " + dayDriver["surnames"]}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <CollaboratorsList
            collaborators={collaborators}
            setCollaborators={setCollaborators}
            numberOfRows={numberOfRows}
            columns={columns}
          />

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
      )}
    </>
  );
};
