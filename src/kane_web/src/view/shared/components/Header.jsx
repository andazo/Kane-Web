import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "./SideBar";
import { ProfileMenu } from "./ProfileMenu";
import { Notifications } from "./Notifications";

import kaneWebLogo from "../assets/kane-logo.png";
import axios from "axios";
import Avatar from "react-avatar";

import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../style/header/header.css";
import { check } from "prettier";

export const Header = (props) => {
  const [showSidebar, setShowSideBar] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pendingRevisions, setPendingRevisions] = useState(0);
  const [showRedDot, setShowRedDot] = useState(true);

  const changeSidebarState = () => {
    setShowSideBar(!showSidebar);
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    axios
      .get(
        "https://us-central1-kane-2023.cloudfunctions.net/app/retrieve/operator/" + id,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setName(response.data[0]["name"]);
        setEmail(response.data[0]["email"]);
      })
      .catch((error) => {
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
        setPendingRevisions(response.data.filter(collaborator => collaborator.status.id == 2).length);
        //setTimeout(() => {
        //  setLoading(!loading);
        //}, 100);
        console.log(pendingRevisions);
      })
      .catch((error) => {
        //setModalShow(!modalShow);
      });

    if(localStorage.getItem('pendingNotifications') == 'false'){
      props.setCheckRevisions(false);
    }
    else{
      props.setCheckRevisions(true);
    }

      // Escuchar cambios en el Local Storage
    const handleStorageChange = (event) => {
      if (event.key == 'pendingNotifications') {
        if(event.newValue == 'true'){
          props.setCheckRevisions(true);
        }
        else if(event.newValue == 'false'){
          props.setCheckRevisions(false);
        }
      }
      else if(props.checkRevisions == true || props.checkRevisions == false){
        localStorage.setItem('pendingNotifications', props.checkRevisions);
      }
      else{
        props.setCheckRevisions(true);
        localStorage.setItem('pendingNotifications', props.checkRevisions);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
    
  }, []);

  useEffect(() => {
    
    setPendingRevisions(pendingRevisions - 1);
    localStorage.setItem('pendingNotifications', props.checkRevisions);

  }, [props.checkRevisions]);



  return (
    <>
      {props.showContent ? (
        <>
          <div className={showSidebar ? "sidebar" : "sidebar close"}>
            <Link to="/home">
              <div className="logo-details">
                <img className="logo-image" src={kaneWebLogo}></img>
                <span className="logo_name">Kãnè taxi</span>
              </div>
            </Link>

            <Sidebar isExpanded={showSidebar} />
          </div>

          <div className="header">
            <div className="left-icons start-0">
              <i className="bi bi-list" onClick={changeSidebarState}></i>
            </div>
            <div className="right-icons end-0">

              <div className="dropdown">
                <i
                  className="bi bi-bell-fill fs-4"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() =>{
                    if(showRedDot){
                      setShowRedDot(false);
                    }
                  }}
                >
                </i>
                {pendingRevisions > 0 && showRedDot && (
                  <div className="notification-alert">
                  {pendingRevisions}
                  </div>
                )}
                <ul className="dropdown-menu dropdown-menu-custom">
                  <Notifications pendingRevisions = {pendingRevisions}/>
                </ul>
              </div>



              <div className="dropdown">
                <i
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Avatar
                    name={ name }
                    alt={ "Avatar de " + name }
                    size={35}
                    round={true}
                    className="position-relative z-1 profile-circle"
                    color="#D26960"
                  />

                </i>
                <ul className="dropdown-menu dropdown-menu-custom">
                  <ProfileMenu name={name} email={email}/>
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
