import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const CenteredModal = (props) => {
  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="text-center">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      {props.body !== null ? (
        <Modal.Body>{props.body}</Modal.Body>
      ) : (
        <div></div>
      )}
      <Modal.Footer>
        <Button onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CenteredModal;
