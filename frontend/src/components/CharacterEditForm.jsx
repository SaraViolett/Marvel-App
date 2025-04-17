import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function CharacterEditForm({ show, handleClose, onUpdate }) {
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    name: "",
    alias: "",
    alignment: "",
    powers: "",
    image_url: "",
  });

  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/characters/${id}`);
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch character: ${err.message}`);
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://127.0.0.1:5000/characters/${id}`,
        formData
      );
      console.log("Character updated:", response.data);
      setUpdated(true);
      setError(null);
      onUpdate(response.data);
    } catch (err) {
      setError(`Failed to update character: ${err.message}`);
      setUpdated(false);
    }
    setValidated(true);
  };

  if (loading) {
    return <p>Loading character details...</p>;
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Character</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {updated && (
            <Alert variant="success" className="mt-3">
              <p>Character successfully updated!</p>
              <Button variant="primary" onClick={handleClose}>Return to character page</Button>
            </Alert>
          )}
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col md="6">
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter character name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group controlId="formAlias" className="mb-3">
                  <Form.Label>Alias</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter character alias"
                    name="alias"
                    value={formData.alias}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid alias.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Form.Group controlId="formAlignment" className="mb-3">
                  <Form.Label>Alignment</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      id="alignment-hero"
                      label="Hero"
                      name="alignment"
                      value="hero"
                      checked={formData.alignment === "hero"}
                      onChange={handleChange}
                      required
                    />
                    <Form.Check
                      type="radio"
                      id="alignment-villain"
                      label="Villain"
                      name="alignment"
                      value="villain"
                      checked={formData.alignment === "villain"}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Form.Control.Feedback type="invalid">
                    Please select an alignment.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group controlId="formPowers" className="mb-3">
                  <FloatingLabel label="Powers" className="mb-3">
                    <Form.Control
                      as="textarea"
                      placeholder="Enter character powers"
                      name="powers"
                      value={formData.powers}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide valid powers.
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formImage" className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>Image URL</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Enter image URL"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid image URL.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center">
                <Button variant="primary" type="submit">
                  Update Character
                </Button>
                <Button variant="secondary" className="ms-2" onClick={handleClose}>
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default CharacterEditForm;
