import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const ProfilePhoto = (props) => {
  return (
    <>
      {props.driver && (
        <>
          <div className=" justify-content-center d-flex mb-3">
            <img
              src={props.driver.userPhoto}
              alt="foto"
              className="rounded-circle mx-auto profile-photo"
            />
          </div>
          <h4 className="profile-h4 mb-4 mt-2 text-center">
            {props.driver.name} {props.driver.surnames}
          </h4>
        </>
      )}
    </>
  );
};
