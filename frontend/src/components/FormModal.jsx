import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const FormModal = ({ character, submitted, showModal, handleCloseModal }) => {

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Form Submitted!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submitted &&
            <>
              <p>You added the following character:</p>
              <p><b>Name: </b>{character.name}</p>
              <p><b>Alias: </b>{character.alias}</p>
              <p><b>Alignment: </b>{character.alignment}</p>
              <p><b>Powers: </b>{character.powers}</p>
              <p><b>Image: </b></p>
              <img src={character.image_url}/>
            </>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FormModal;