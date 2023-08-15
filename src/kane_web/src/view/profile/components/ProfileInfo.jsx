import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "../styles/profile.css";

export const ProfileInfo = (props) => {
  return (
    <>
    {props.driver && (
      <div className="col-lg-6">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-2 col-md-3 col-sm-4">
                <p className="mb-0">Cédula</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{props.driver.userId}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-2 col-md-3 col-sm-4">
                <p className="mb-0">Placa</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{props.driver.plateNumber}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-2 col-md-3 col-sm-4">
                <p className="mb-0">Celular</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{props.driver.phoneNumber}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-2 col-md-3 col-sm-4">
                <p className="mb-0">Correo</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{props.driver.email}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-2 col-md-3 col-sm-4">
                <p className="mb-0">Estado</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{props.driver.status.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};
