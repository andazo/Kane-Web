import { useEffect, useState } from "react";
import { RevisionList } from "../Components/RevisionList";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../shared/components/Loading";
import { PanicAlert } from "../../notifications/pages/PanicAlert";

import CenteredModal from "../../shared/components/Modal";
import axios from "axios";

export const AccountApproval = () => {
  const numberOfRows = 10;
  const [collaborators, setCollaborators] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alertInformation, setAlertInformation] = useState({});
  const [alert, setAlert] = useState(false);
  const navigateTo = useNavigate();

  const columns = [
    {
      name: "Cédula",
      selector: (row) => row.userId,
      sortable: true,
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
      name: "Estado cuenta",
      selector: (row) => row.status.description,
      sortable: true,
    },
  ];

  //Buscar cuentas inactivas
  function checkWaitingDrivers(driver) {
    return driver.status.id == 2;
  }

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
        "https://us-central1-kane-2023.cloudfunctions.net/app/retrieve/taxistas",
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setCollaborators(response.data.filter(checkWaitingDrivers));
        setTimeout(() => {
          setLoading(!loading);
        }, 100);
      })
      .catch((error) => {
        setModalShow(!modalShow);
      });
  }, []);

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        {loading && <Loading />}
      </div>

      { (alert && !loading)  && <PanicAlert information={alertInformation}/> }

      {!loading && (
        <RevisionList
          collaborators={collaborators}
          setCollaborators={setCollaborators}
          numberOfRows={numberOfRows}
          columns={columns}
        />
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
