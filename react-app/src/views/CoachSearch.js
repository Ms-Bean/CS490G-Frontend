import React, { useState } from "react";
import { Form, Button, Card, Row, Col, Container, Alert, Spinner } from "react-bootstrap";
import StarRatings from "react-star-ratings";

const CoachSearch = () => {
  const [searchParams, setSearchParams] = useState({
    name: "",
    minRating: "",
    maxRating: "",
    minHourlyRate: "",
    maxHourlyRate: "",
    minExperience: "",
    maxExperience: "",
    city: "",
    state: "",
  });
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // current page state
  const pageSize = 10;

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const createSearchRequestBody = (searchParams) => {
    const [defaultMinRating, defaultMaxRating] = [1, 5];
    const [defaultMinHourlyRate, defaultMaxHourlyRate] = [0, 1_000_000]; // TODO: We need to decide on a default max hourly rate
    const [defaultMinExperienceLevel, defaultMaxExperienceLevel] = [0, 100];

    const pageInfo = { page_num: currentPage, page_size: pageSize };
    const filterOptions = {
      name: searchParams.name,
      rating: { min: Number(searchParams.minRating) || defaultMinRating, max: Number(searchParams.maxRating) || defaultMaxRating },
      hourly_rate: {
        min: Number(searchParams.minHourlyRate) || defaultMinHourlyRate,
        max: Number(searchParams.maxHourlyRate) || defaultMaxHourlyRate,
      },
      experience_level: {
        min: Number(searchParams.minExperience) || defaultMinExperienceLevel,
        max: Number(searchParams.maxExperience) || defaultMaxExperienceLevel,
      },
      location: { city: searchParams.city, state: searchParams.state },
    };

    return { page_info: pageInfo, filter_options: filterOptions };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const headers = { Accept: "application/json", "Content-Type": "application/json" };
    const body = JSON.stringify(createSearchRequestBody(searchParams));
    try {
      const response = await fetch("http://localhost:3500/coaches/search", { method: "POST", headers: headers, body: body });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log(data.coaches);
      setResults(data.coaches);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Card className="mt-5">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" name="name" value={searchParams.name} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" placeholder="City" name="city" value={searchParams.city} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formState">
                  <Form.Label>State</Form.Label>
                  <Form.Control type="text" placeholder="State" name="state" value={searchParams.state} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formMinRating">
                  <Form.Label>Min Rating</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Min Rating"
                    name="minRating"
                    value={searchParams.minRating}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formMaxRating">
                  <Form.Label>Max Rating</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Max Rating"
                    name="maxRating"
                    value={searchParams.maxRating}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formMinHourlyRate">
                  <Form.Label>Min Hourly Rate</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Min Hourly Rate"
                    name="minHourlyRate"
                    value={searchParams.minHourlyRate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formMaxHourlyRate">
                  <Form.Label>Max Hourly Rate</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Max Hourly Rate"
                    name="maxHourlyRate"
                    value={searchParams.maxHourlyRate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formMinExperience">
                  <Form.Label>Min Experience (Years)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Min Experience"
                    name="minExperience"
                    value={searchParams.minExperience}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formMaxExperience">
                  <Form.Label>Max Experience (Years)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Max Experience"
                    name="maxExperience"
                    value={searchParams.maxExperience}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Container className="mt-4">
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          results.map((coach, index) => (
            <Card key={index} className="mb-3">
              <Card.Body className="pb-1">
                <Card.Title>
                  {coach.personal_info.first_name} {coach.personal_info.last_name}
                </Card.Title>
                <Row>
                  <Col md={6}>
                    <p>
                      <strong>About:</strong> {coach.personal_info.about_me || "Not provided"}
                    </p>
                    <p>
                      <strong>Experience:</strong> {coach.professional_info.experience_level} years
                    </p>
                    <p>
                      <strong>Hourly Rate:</strong> ${coach.professional_info.hourly_rate.toFixed(2)}
                    </p>
                    <p>
                      <strong>Accepting New Clients:</strong> {coach.professional_info.accepting_new_clients ? "Yes" : "No"}
                    </p>
                    <p>
                      <strong>Location:</strong> {`${coach.location.city}, ${coach.location.state}`}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <strong>Coaching History:</strong> {coach.professional_info.coaching_history || "Not provided"}
                    </p>
                    <p>
                      <strong>Goals:</strong> {coach.professional_info.goals.join(", ") || "Not specified"}
                    </p>
                    <p>
                      <strong>Rating: </strong>
                      {coach.professional_info.rating ? (
                        <StarRatings rating={coach.professional_info.rating} starRatedColor="orange" numberOfStars={5} starDimension="20px" starSpacing="2px" />
                      ) : (
                        "Not rated"
                      )}
                    </p>{" "}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </Container>
  );
};

export default CoachSearch;
