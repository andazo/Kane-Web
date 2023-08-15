import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./view/shared/components/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Home } from "./view/home/pages/Home";
import { Collaborators } from "./view/collaborators/pages/Collaborators";
import { AccountApproval } from "./view/collaborators/pages/AccountApproval";
import { DocumentInspection } from "./view/collaborators/pages/DocumentInspection";
import { EditCooperative } from "./view/cooperative/pages/EditCooperative";
import { Login } from "./view/authentication/pages/Login";
import { RecoverPassword } from "./view/authentication/pages/RecoverPassword";
import { ChangePassword } from "./view/authentication/pages/ChangePassword";
import { VerificationCode } from "./view/authentication/pages/VerificationCode";
import { Profile } from "./view/profile/pages/Profile";
import { Drivers } from "./view/reports/pages/Drivers";
import { Customers } from "./view/reports/pages/Customers";
import { Inactives } from "./view/reports/pages/Inactives";
import { PanicDetails } from "./view/panicDetails/pages/PanicDetails";

import "./view/shared/style/main/main.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Main = () => {
  const location = useLocation();
  const [checkRevisions, setCheckRevisions] = useState();

  const changeLocation = (path) => {
    location.pathname === path;
  };

  return (
    <>
      <div className="main">
        <Header
          showContent={
            location.pathname.includes("/account/") || location.pathname === "/"
              ? false
              : true
          }
          checkRevisions = {checkRevisions}
          setCheckRevisions = {setCheckRevisions}
        />
        <div
          className={
            location.pathname.includes("/account/") || location.pathname === "/"
              ? "login"
              : "main-content"
          }
        >
          <Routes>
            <Route
              path="/"
              element={<Login />}
              action={changeLocation("/account/login")}
            />
            <Route
              path="/home"
              element={<Home />}
              action={changeLocation("/home")}
            />

            <Route
              path="/collaborators"
              element={<Collaborators />}
              action={changeLocation("/collaborators")}
            />

            <Route
              path="/collaborators/account-revision/:id"
              element={<DocumentInspection checkRevisions = {checkRevisions} setCheckRevisions = {setCheckRevisions}/>}
              action={changeLocation("/collaborators/account-revision")}
            />

            <Route
              path="/collaborators/account-approval"
              element={<AccountApproval />}
              action={changeLocation("/collaborators/account-approval")}
            />

            <Route
              path="reports"
              element={<Drivers />}
              action={changeLocation("reports/drivers")}
            />
            <Route
              path="reports/drivers"
              element={<Drivers />}
              action={changeLocation("reports/drivers")}
            />
            <Route
              path="reports/customers"
              element={<Customers />}
              action={changeLocation("reports/customers")}
            />
            <Route
              path="reports/inactives"
              element={<Inactives />}
              action={changeLocation("reports/inactives")}
            />
            <Route
              path="/cooperative/edit-cooperative"
              element={<EditCooperative />}
              action={changeLocation("/cooperative/edit-cooperative")}
            />

            <Route
              path="/account/login"
              element={<Login />}
              action={changeLocation("/account/login")}
            />

            <Route
              path="/account/recover-password"
              element={<RecoverPassword />}
              action={changeLocation("/account/recover-password")}
            />

            <Route
              path="/account/change-password"
              element={<ChangePassword />}
              action={changeLocation("/account/change-password")}
            />

            <Route
              path="/profile/:id"
              element={<Profile />}
              action={changeLocation("/profile")}
            />

            <Route
              path="/account/verification-code"
              element={<VerificationCode />}
              action={changeLocation("/account/verification-code")}
            />

            <Route
              path="/panic-details"
              element={<PanicDetails />}
              action={changeLocation("/panic-details")}
            />

            {}
          </Routes>
        </div>
      </div>
    </>
  );
};

root.render(
  <React.StrictMode>
    <Router>
      <Main />
    </Router>
  </React.StrictMode>
);
