import { Container, Row, Col, Image, Carousel, Modal } from "react-bootstrap";
import { useState } from "react";

import "../styles/gallery.css";

export const Gallery = (props) => {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  //NO HAY FOTO DE CEDULA EN EL RETRIEVE
  //TAL VEZ PEDIR UN ENPOINT DE TAXISTA POR CEDULA

  const images = [
    {
      id: 1,
      src: "https://i.ibb.co/MndgKcc/idPhoto.jpg",
      alt: "Cédula",
      caption: "Cédula",
    },
    {
      id: 2,
      src: props.driver?.licensePhoto,
      alt: "Licencia",
      caption: "Licencia",
    },
    {
      id: 3,
      src: props.taxi?.propertyTitlePhoto,
      alt: "Título de propiedad",
      caption: "Título de propiedad",
    },
    {
      id: 4,
      src: props.taxi?.marchamoPhoto,
      alt: "Marchamo",
      caption: "Marchamo",
    },
    {
      id: 5,
      src: props.taxi?.technicalReviewPhoto,
      alt: "Revisión Técnica vehicular",
      caption: "Revisión Técnica vehicular",
    },
    {
      id: 6,
      src: props.taxi?.insurancePhoto,
      alt: "Póliza de seguro del vehiculo",
      caption: "Póliza de seguro del vehiculo",
    },
    {
      id: 7,
      src: props.taxi?.taxiFrontPhoto,
      alt: "Vista frontal",
      caption: "Vista frontal",
    },
    {
      id: 8,
      src: props.taxi?.taxiBackPhoto,
      alt: "Vista trasera",
      caption: "Vista trasera",
    },
    {
      id: 9,
      src: props.taxi?.taxiLeftPhoto,
      alt: "Costado izquierdo",
      caption: "Costado izquierdo",
    },
    {
      id: 10,
      src: props.taxi?.taxiRightPhoto,
      alt: "Costado derecho",
      caption: "Costado derecho",
    },
    {
      id: 11,
      src: props.taxi?.vehiclePlatePhoto,
      alt: "Placa",
      caption: "Placa",
    },
  ];

  const handleShow = (image) => {
    setSelectedImage(image);
    setShow(true);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setShow(false);
  };


  return (
    <Container>
      <Row>
        <Col>
          <Carousel>
            {images.map((image) => (
              <Carousel.Item key={image.id} onClick={() => handleShow(image)}>
                 <h4 className='text-center my-3'>{image.caption}</h4>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="mx-auto d-block image"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {selectedImage && (
            <div>
              <h5 className="text-center my-2">{selectedImage.caption}</h5>
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fluid
                className="mx-auto d-block"
              />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};
