import { ReportsList } from "../components/ReportsList";
import { useEffect, useState } from "react";
import { Loading } from "../../shared/components/Loading";
import { useNavigate } from "react-router-dom";
import { PanicAlert } from "../../notifications/pages/PanicAlert";

import CenteredModal from "../../shared/components/Modal";
import axios from "axios";

import "../styles/reports.css";

export const Customers = () => {
  const numberOfRows = 10;
  const [Customers, setCustomers] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alertInformation, setAlertInformation] = useState({});
  const [alert, setAlert] = useState(false);
  const navigateTo = useNavigate();

  const columns = [
    {
      name: "Identificación",
      selector: (row) => row.userId,
      sortable: true,
      width: "165px",
    },
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Correo electrónico",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Telefono",
      selector: (row) => row.phoneNumber,
      sortable: true,
      width: "150px",
    },
    {
      name: "Puntuación",
      selector: (row) => {
        var score = row.score? row.score?.toString() : '';
        if(score.length > 4){
          return score.slice(0,4);
        }
        else{
          return score;
        }
      },
      sortable: true,
      width: "145px",
    },
    /* ESPERAR A QUE HAYA UN CAMPO DE STATE EN EL BACKEND
    {
      name: "Estado",
      selector: (row) => row.state,
      width: "100px",
    },
    */
  ];

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
        "https://us-central1-kane-2023.cloudfunctions.net/app/retrieve/customer",
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setCustomers(response.data);
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

      {(alert && !loading)  && <PanicAlert information={alertInformation} />}

      {!loading && (
        <ReportsList
          title="Reporte de Clientes"
          numberOfRows={numberOfRows}
          columns={columns}
          data={Customers}
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
