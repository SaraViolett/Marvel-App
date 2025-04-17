import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import CharacterEditForm from "./CharacterEditForm";

function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [deleted, setDeleted] = useState(false); // Deleted state
  const [deleteError, setDeleteError] = useState(null); // Error state
  const [showEditForm, setShowEditForm] = useState(false); // Modal state for edit form
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const characterResponse = await axios.get(
          `http://127.0.0.1:5000/characters/${id}`
        );
        setCharacter(characterResponse.data);
      } catch (error) {
        setError(`Failed to fetch character: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchCharacter();
    }
  }, [id]);

  if (loading) {
    return <p>Loading character details...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  const handleDelete = async () => {
    axios
      .delete(`http://127.0.0.1:5000/characters/${id}`)
      .then((response) => {
        setDeleted(true);
        console.log(response.data);
      })
      .catch((deleteError) => {
        setDeleteError(`Failed to delete character: ${deleteError.message}`);
      });
    setDeleted(true);
  };

  const handleEditClick = () => setShowEditForm(true);
  const handleCloseEditForm = () => setShowEditForm(false);

  const handleUpdate = (updatedCharacter) => {
    setCharacter(updatedCharacter);
  };

  const handleDeleteButton = () => setShowDeleteConfirmation(true);
  const handleCloseAlert = () => setShowDeleteConfirmation(false);

  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      <div className="m-2">
        <Link to="/characters" className="btn btn-secondary me-2">
          Return to <span className="text-warning fw-bold"> CHARACTERS</span>{" "}
          Page
        </Link>
      </div>

      <div className="d-flex justify-content-center align-items-center flex-md-row flex-column">
        <div className="m-2">
          <img
            alt={character.name}
            src={character.image_url}
            className="custom-img"
          />
        </div>
        <div className="character-details-card d-flex flex-column m-2">
          <h1 className="fw-bold">{character.name}</h1>
          <p>
            <strong>Alias:</strong> {character.alias}
          </p>
          <p>
            <strong>Alignment:</strong> {character.alignment}
          </p>
          <p>
            <strong>Powers:</strong> {character.powers}
          </p>
          <div className="d-flex justify-content-center align-items-center">
            <Button
              variant="secondary"
              className="me-2"
              onClick={handleEditClick}
            >
              Edit Character
            </Button>
            <Button
              variant="danger"
              className="ms-2"
              onClick={handleDeleteButton}
            >
              Delete Character
            </Button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
      {showDeleteConfirmation && (
        <Alert variant="danger">
          <p>Are you sure you want to delete {character.name}?</p>
          <div className="d-flex justify-content-center align-items-center">
            <Button onClick={handleDelete} variant="danger" className="m-2">
              Yes
            </Button>
            <Button onClick={handleCloseAlert} variant="secondary">
              No
            </Button>
          </div>
        </Alert>
      )}
      {deleted && (
        <Alert variant="success" className="m-2">
          <p>{character.name} deleted successfully.</p>
          <Link to="/characters" className="btn btn-secondary me-2">
            Return to <span className="text-warning fw-bold"> CHARACTERS</span>{" "}
            Page
          </Link>
        </Alert>
      )}
      {deleteError && (
        <Alert variant="danger" className="m-2">
          <p>{deleteError}</p>
        </Alert>
      )}
      </div>
      

      {/* Modal for Edit Form */}
      <Modal show={showEditForm} onHide={handleCloseEditForm}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Character</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CharacterEditForm
            show={showEditForm}
            handleClose={handleCloseEditForm}
            onUpdate={handleUpdate}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CharacterDetails;
