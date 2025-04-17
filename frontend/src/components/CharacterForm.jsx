import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Link } from "react-router-dom";
import FormModal from "./FormModal";
import axios from "axios";

const CharacterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    alias: "",
    alignment: "",
    powers: "",
    image_url: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);

  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/characters",
          formData
        );
        console.log(response.data);
        setCharacter(response.data);
        setSubmitted(true);
        setShowModal(true);
        setError(null);
      } catch (error) {
        setError(`Failed to submit form: ${error.message}`);
        setSubmitted(false);
      }
    }
    setValidated(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      alias: "",
      alignment: "",
      powers: "",
      image_url: "",
    });
    setValidated(false);
    setSubmitted(false);
    setError(null);
  };

  return (
    <Container className="mt-4">
      <h2>Add a New Character</h2>

      <FormModal
        character={character}
        submitted={submitted}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />

      {submitted && (
        <Alert variant="success" className="mt-3">
          {character.name} added successfully!
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
              <Form.Label className="fw-semibold">Name</Form.Label>
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
              <Form.Label className="fw-semibold">Alias</Form.Label>
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
              <Form.Label className="fw-semibold">Alignment</Form.Label>
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
            <Form.Label className="fw-semibold">Powers</Form.Label>
              <FloatingLabel label="Enter character powers" className="mb-3">
                <Form.Control
                  as="textarea"
                  placeholder="Enter character powers"
                  name="powers"
                  value={formData.powers}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide character powers.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formImage" className="mb-3">
              <InputGroup>
                <InputGroup.Text className="fw-semibold">Image URL</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter image URL"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  onBlur={(e) => {
                    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i;
                    if (!urlPattern.test(e.target.value)) {
                      setError("Please provide a valid image URL (e.g., https://example.com/image.jpg).");
                    } else {
                      setError(null); 
                    }
                  }}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid image URL.
                </Form.Control.Feedback>
              </InputGroup>
              {error && <small className="text-danger">{error}</small>}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button variant="danger" type="submit" className="fw-bold">
              Submit New MARVEL <span className="text-warning"> CHARACTER</span>
            </Button>
            <Button
              variant="outline-secondary"
              className="ms-2 fw-bold"
              onClick={resetForm}
            >
              Reset Form
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
export default CharacterForm;
