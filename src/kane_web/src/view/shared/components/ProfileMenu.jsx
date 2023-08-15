import { Link } from "react-router-dom";

import Avatar from "react-avatar";

import "../style/profileMenu/ProfileMenu.css";

const CreateMenu = (props) => {
  return (
    <li>
      <div className="text-center">
        <Link to={props.link}>
          <div className="row g-0 align-items-center justify-content-center profile-menu-a">
            <div className="col-2">
              <i className={"icon-color bi " + props.icon}></i>
            </div>
            <div className="col-8">
              <div className="card-body">
                <p className="card-text no-word-break">{props.option}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </li>
  );
};

export const ProfileMenu = (props) => {
  return (
    <>
      <div className="card border-0">
        <div className="container-fluid dropdown-menu-absolute-div"></div>
        <div className="row justify-content-center">
          <div className="text-center">
            <Avatar
              name={props.name}
              alt={"Avatar de " + props.name}
              size={100}
              round={true}
              className="position-relative z-1"
              color="#D26960"
            />
          </div>
        </div>
        <p></p>
        <div className="row justify-content-center">
          <div className="col text-center">
            <h5 className="text-style"> {props.name} </h5>
            <h6 className="text-style"> {props.email} </h6>
          </div>
        </div>
        <hr />
        {/* Cooperative configuration button */}
        <CreateMenu
          link="cooperative/edit-cooperative"
          icon="bi-pencil-fill"
          option="Configuración de cooperativa"
        />

        <CreateMenu
          link="/account/login"
          icon="bi-box-arrow-right"
          option="Cerrar sesión"
        />
      </div>
    </>
  );
};
