import { Link } from "react-router-dom";

import Avatar from "react-avatar";

import "../style/profileMenu/ProfileMenu.css";

export const Notifications = (props) => {
    
    const setText = () => {
        var theText = "";
        if(props.pendingRevisions > 1){
            theText = "Tienes " + props.pendingRevisions + " taxistas en espera de revisión";
        }
        else if(props.pendingRevisions > 0){
            theText = "Tienes una taxista en espera de revisión";
        }
        else{
            theText = "Todo en orden";
        }
        return theText;
    }


  return (
    <>
      <div className="card border-0">
        <div className="row justify-content-center">
          <div className="text-center">
            
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col text-center pt-1">
            <Link to = {"/collaborators/account-approval"}>
                <h6 className="text-style"> 
                    {setText()}
                </h6>            
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
