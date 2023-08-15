import { useState } from "react";
import { Link } from "react-router-dom";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "../style/sideBar/sideBar.css";

export const Sidebar = (props) => {
  const [showSubmenu, setShowSubmenu] = useState(false);

  const changeSubmenuState = () => {
    setShowSubmenu(!showSubmenu);
  };

  return (
    <>
      <ul className="nav-links">
        <li>
          <div className="icon-link">
            <Link to="/home">
              <i className="bi bi-house-fill"></i>
              <span className="link_name">Inicio</span>
            </Link>
          </div>
          <hr className="text-secondary"></hr>
        </li>
        <li>
          <div className="icon-link">
            <Link to="/collaborators">
              <i className="bi bi-people-fill"></i>
              <span className="link_name">Taxistas</span>
            </Link>
          </div>
          <hr className="text-secondary" />
        </li>
        { <li>
          <div className="icon-link">
            <Link to="/collaborators/account-approval">
              <i className="bi bi-list-check"></i>
              <span className="link_name">Revisiones</span>
            </Link>
          </div>
          <hr className="text-secondary" />
        </li>}
        <li>
          <div className="icon-link">
            <Link to="/reports/drivers">
              <i className="bi bi-file-earmark-fill"></i>
              <span className="link_name">Reportes</span>
            </Link>

            {props.isExpanded ? (
              <i
                className={
                  showSubmenu ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"
                }
                onClick={changeSubmenuState}
              ></i>
            ) : (
              <i></i>
            )}
          </div>
          <ul className={showSubmenu ? "bx-menu" : "sub-menu"}>
            {showSubmenu && props.isExpanded ? (
              <>
                <li>
                  <div className="icon-link">
                    <Link to="/reports/drivers">
                        <i className="bi bi-car-front-fill"></i>
                        <span className="link_name">Taxistas</span>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="icon-link">
                    <Link to="/reports/customers">
                        <i className="bi bi-person-lines-fill"></i>
                        <span className="link_name">Clientes</span>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="icon-link">
                    <Link to="/reports/inactives">
                        <i className="bi bi-moon-fill"></i>
                        <span className="link_name">Inactivos</span>
                    </Link>
                  </div>
                </li>
              </>
            ) : (
              <li></li>
            )}
          </ul>
          <hr className="text-secondary" />
        </li>
        <li />
      </ul>
    </>
  );
};
