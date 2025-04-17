import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

function Characters() {
  const [characters, setCharacters] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/characters")
      .then((response) => {
        setCharacters(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(`Failed to fetch characters: ${error.message}`);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container>
        <h3>
          <Spinner
            animation="border"
            variant="info"
            style={{ marginRight: "15px" }}
            role="status"
          />
          Loading Characters...
        </h3>
      </Container>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <Container>
      <h1 className="text-center bg-danger text-warning rounded-2 mt-5 fs-1 fw-bold p-1">CHARACTERS</h1>
      <Row>
        {characters.map((character) => (
          <Col key={character.id} className="mt-4">
            <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="bottom"
                    alt={character.name}
                    src={character.image_url}
                    className="custom-img"
                  />
              <Card.Body>
                <Card.Title>{character.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {character.alias}
                </Card.Subtitle>
                <Link to={`/character/${character.id}`} className="btn btn-danger text-white fw-bold">
                                        View {character.name}'s Details
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Characters;
