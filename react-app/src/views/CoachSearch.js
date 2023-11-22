import React, { useState, useEffect } from "react";
import { Form, Button, Card, Row, Col, Container, Alert, Spinner, Modal, Navbar, Nav, FormControl, Dropdown } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const CoachSearch = () => {
  const [searchParams, setSearchParams] = useState({
    name: "",
    minHourlyRate: "",
    maxHourlyRate: "",
    minExperience: "",
    maxExperience: "",
  });
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [showModal, setShowModal] = useState(false);
  const [sortOption, setSortOption] = useState({ key: "name", isDescending: false });
  const getSortDirectionIcon = (key) => {
    return sortOption.key === key
      ? sortOption.isDescending
        ? " ↓" // icon or text for descending
        : " ↑" // icon or text for ascending
      : "";
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const createSearchRequestBody = (searchParams) => {
    const [defaultMinHourlyRate, defaultMaxHourlyRate] = [0, 1_000_000];
    const [defaultMinExperienceLevel, defaultMaxExperienceLevel] = [0, 100];

    const pageInfo = { page_num: currentPage, page_size: pageSize };
    const filterOptions = {
      name: searchParams.name,
      hourly_rate: {
        min: Number(searchParams.minHourlyRate) || defaultMinHourlyRate,
        max: Number(searchParams.maxHourlyRate) || defaultMaxHourlyRate,
      },
      experience_level: {
        min: Number(searchParams.minExperience) || defaultMinExperienceLevel,
        max: Number(searchParams.maxExperience) || defaultMaxExperienceLevel,
      },
    };

    return { page_info: pageInfo, filter_options: filterOptions };
  };

  const fetchCoaches = async () => {
    setIsLoading(true);
    setError(null);

    const headers = { Accept: "application/json", "Content-Type": "application/json" };
    const body = JSON.stringify({
      ...createSearchRequestBody(searchParams),
      sort_options: {
        key: sortOption.key,
        is_descending: sortOption.isDescending,
      },
    });

    try {
      const response = await fetch("http://localhost:3500/coaches/search", { method: "POST", headers: headers, body: body });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setResults(data.coaches);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, [sortOption]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchCoaches();
  };

  const handleSortChange = (key) => {
    setSortOption((prevSortOption) => ({
      key: key,
      isDescending: prevSortOption.key === key ? !prevSortOption.isDescending : false,
    }));
  };

  return (
    <div>
      <Navbar variant="dark" bg="dark" expand="lg" className="secondary-navbar">
        <Container>
          <Navbar.Brand>Personal Trainer Search</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto" />

            <Form className="d-flex" onSubmit={handleSubmit}>
              <FormControl
                type="text"
                placeholder="Search by name..."
                name="name"
                value={searchParams.name}
                onChange={handleChange}
                className="me-2"
              />
              <Button variant="secondary" type="submit">
                <FaSearch />
              </Button>
              <Button variant="secondary" onClick={handleModalShow} className="ms-2">
                Filters
              </Button>
              <Dropdown variant="secondary" className="ms-2">
                <Dropdown.Toggle variant="secondary" id="dropdown-basic-button">
                  Sort
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleSortChange("name")}>Name{getSortDirectionIcon("name")}</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSortChange("hourly_rate")}>
                    Hourly Rate{getSortDirectionIcon("hourly_rate")}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSortChange("experience_level")}>
                    Experience{getSortDirectionIcon("experience_level")}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Search Filters</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              {/* Name */}
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" name="name" value={searchParams.name} onChange={handleChange} />
              </Form.Group>

              {/* Hourly Rate */}
              <Row>
                <Col>
                  <Form.Group controlId="formMinHourlyRate" className="mb-3">
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
                  <Form.Group controlId="formMaxHourlyRate" className="mb-3">
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

              {/* Experience */}
              <Row>
                <Col>
                  <Form.Group controlId="formMinExperience" className="mb-3">
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
                  <Form.Group controlId="formMaxExperience" className="mb-3">
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

              <Button variant="primary" type="submit" className="me-2">
                Search
              </Button>
              <Button variant="secondary" onClick={handleModalClose}>
                Close
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Container className="mt-4">
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : error ? (
            <Alert variant="danger">Something went wrong. Please try again later.</Alert>
          ) : results.length === 0 ? (
            <Alert variant="info">No coaches found. Try adjusting your search criteria.</Alert>
          ) : (
            <Row>
              {results.map((coach, index) => (
                <Col key={index} md={4} className="mb-4">
                  <Card>
                    <Card.Body className="pb-1">
                      <Card.Title>
                        {" "}
                        {coach.personal_info.first_name} {coach.personal_info.last_name}
                      </Card.Title>
                      <Row>
                        <Col md={6}>
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
                            <strong>Coaching History:</strong> {coach.professional_info.coaching_history || "Not provided"}
                          </p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </Container>
    </div>
  );
};

export default CoachSearch;
