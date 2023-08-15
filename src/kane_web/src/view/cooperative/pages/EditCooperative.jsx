import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../shared/components/Loading";
import { PanicAlert } from "../../notifications/pages/PanicAlert";
import { FormInput } from "../components/FormInput";

import CenteredModal from "../../shared/components/Modal";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/cooperative.css";

export const EditCooperative = () => {
  const [phoneNumber, setPhoneNumber] = useState("88888888");
  const [firstKmCost, setFirstKmCost] = useState(1000);
  const [secondKmCost, setSecondKmCost] = useState(1200);
  const [isFirstKmCostInvalid, setIsFirstKmCostInvalid] = useState(false);
  const [isSecondKmCostInvalid, setIsSecondKmCostInvalid] = useState(false);
  const [isPhoneInvalid, setIsPhoneInvalid] = useState(false);
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);
  const [showSavingModal, setShowSavingModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [saveSuccesful, setSaveSuccesful] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [alertInformation, setAlertInformation] = useState({});
  const [alert, setAlert] = useState(false);
  const navigateTo = useNavigate();

  const invalidPhoneMsg =
    "Número telefónico no válido. Debe tener ocho dígitos, el primer número debe ser mayor que \
    2 y opcionalmente puede colocar un guión en el medio";
  const invalidKmCost = "El monto ingresado no es válido";
  const successTitle = "Cambios guardados con éxito";
  const successMsg = "Los cambios han sido guardados con éxito";
  const errorTitle = "Ha ocurrido un error inesperado";
  const errorMsg =
    "No se pudieron guardar los cambios, por favor inténtelo nuevamente";
  const maxKmCost = 2000;
  const minKmCost = 800;

  const getCooperativeInformation = () => {
    axios
      .get(
        "https://us-central1-kane-2023.cloudfunctions.net/app/retrieve/getCooperativeInfo",
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setPhoneNumber(response.data.phoneNumber);
        setFirstKmCost(response.data.firstKmCost);
        setSecondKmCost(response.data.secondKmCost);
      })
      .catch((error) => {
        setModalShow(!modalShow);
      });
  };

  const updateCooperativeInformation = () => {
    axios
      .put(
        "https://us-central1-kane-2023.cloudfunctions.net/app/update/updateCooperativeInfo",
        {
          phoneNumber: phoneNumber,
          firstKmCost: firstKmCost,
          secondKmCost: secondKmCost,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if (response.data["message"] === "Datos actualizados") {
          setShowSavingModal(false);
          setSaveSuccesful(true);
          setShowNoticeModal(true);
        }
      })
      .catch((error) => {
        setShowNoticeModal(!showNoticeModal);
      });
  };  

  const validatePhoneNumber = () => {
    const phoneRegex = /^[2-9]\d{3}-?\d{4}$/;
    setIsPhoneInvalid(!phoneRegex.test(phoneNumber.toString()));
  };

  const validateCostFields = () => {
    const numbersRegex = /^[0-9]+$/;
    setIsFirstKmCostInvalid(!numbersRegex.test(firstKmCost));
    setIsSecondKmCostInvalid(!numbersRegex.test(secondKmCost));
}


  useEffect(() => {
    if (loading) {
      getCooperativeInformation();
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }

    validatePhoneNumber();
    validateCostFields();

    if (!isPhoneInvalid && !isFirstKmCostInvalid && !isSecondKmCostInvalid) {
      setCanSave(true);
    } else {
      setCanSave(false);
    }
  }, [
    loading,
    phoneNumber,
    firstKmCost,
    secondKmCost,
    isPhoneInvalid,
    isFirstKmCostInvalid,
    isSecondKmCostInvalid,
  ]);
    
  const handleSave = (e) => {
    e.preventDefault();
    if (isEditingEnabled) {
      validateCostFields();
      if (String(firstKmCost).startsWith("0") || String(secondKmCost).startsWith("0")) {
        window.alert("El costo no puede empezar con 0");
      }
      else if (firstKmCost < minKmCost || firstKmCost > maxKmCost ||
        secondKmCost < minKmCost || secondKmCost > maxKmCost) {
          window.alert("El costo de los kilómetros debe estar entre 800 y 2000");
    }
    else {
        setShowSavingModal(true);
        setIsEditingEnabled(!isEditingEnabled);
        setCanSave(false);
        updateCooperativeInformation();
      }
    }
  };


  const handleSubmit = handleSave;

  return (
    <>
      {alert && !loading && <PanicAlert information={alertInformation} />}

      <div className="d-flex align-items-center justify-content-center">
        {loading && <Loading />}
      </div>

      {!loading && (
        <>
          <div className="container mt-3">
            <h1 className="text-style text-center">
              Información de la cooperativa
            </h1>
            <br />
            <div className="d-flex justify-content-center">
              <div className="card w-50">
                <div className="container p-3">
                  <form method="post" onSubmit={handleSubmit}>
                    <div className="form-group d-grid gap-3">
                      <FormInput
                        id="phoneNumber"
                        label="Teléfono de la cooperativa"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        disabled={!isEditingEnabled}
                        isValid={isPhoneInvalid}
                        errorMessage={invalidPhoneMsg}
                      />
                      <FormInput
                        id="firstKmCost"
                        label="Costo del primer kilómetro"
                        value={firstKmCost}
                        onChange={(e) => setFirstKmCost(e.target.value)}
                        disabled={!isEditingEnabled}
                        isValid={isFirstKmCostInvalid}
                        errorMessage={invalidKmCost}
                        prependText="₡"   
                      />
                      <FormInput
                        id="secondKmCost"
                        label="Costo del segundo kilómetro"
                        value={secondKmCost}
                        onChange={(e) => setSecondKmCost(e.target.value)}
                        isValid={isSecondKmCostInvalid}
                        errorMessage={invalidKmCost}
                        prependText="₡"
                        disabled={!isEditingEnabled}                      
                      />
                      <div className="text-center">
                        <button
                          type="button"
                          className="btn button btn-sm"
                          onClick={() => setIsEditingEnabled(!isEditingEnabled)}
                          disabled={isEditingEnabled}                       
                        >
                          Editar
                        </button>{" "}
                        <button
                          type="submit"
                          className="btn button btn-sm"
                          disabled={!canSave} >
                          Guardar cambios
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <CenteredModal
            title={"Guardando cambios"}
            body={"Espere un momento mientras se guardan los cambios"}
            show={showSavingModal}
            onHide={() => {
              setShowSavingModal(false);
            }}
          />

          <CenteredModal
            title={saveSuccesful ? successTitle : errorTitle}
            body={saveSuccesful ? successMsg : errorMsg}
            show={showNoticeModal}
            onHide={() => {
              setShowNoticeModal(false);
            }}
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
