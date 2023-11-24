import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const SearchFiltersModal = ({ show, handleClose, searchParams, handleChange, handleSubmit }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Filters</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Name */}
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" name="name" value={searchParams.name} onChange={handleChange} />
          </Form.Group>

          {/* Hourly Rate */}
          <Row className="mb-3">
            <Form.Label>Hourly Rate</Form.Label>
            <Col>
              <Form.Control
                type="number"
                placeholder="Min Hourly Rate"
                name="minHourlyRate"
                value={searchParams.minHourlyRate}
                onChange={handleChange}
              />
            </Col>
            <Col xs={1} className="d-flex align-items-center justify-content-center">
              to
            </Col>
            <Col>
              <Form.Control
                type="number"
                placeholder="Max Hourly Rate"
                name="maxHourlyRate"
                value={searchParams.maxHourlyRate}
                onChange={handleChange}
              />
            </Col>
          </Row>

          {/* Experience */}
          <Row className="mb-3">
            <Form.Label>Experience</Form.Label>
            <Col>
              <Form.Control
                type="number"
                placeholder="Min Experience"
                name="minExperience"
                value={searchParams.minExperience}
                onChange={handleChange}
              />
            </Col>
            <Col xs={1} className="d-flex align-items-center justify-content-center">
              to
            </Col>
            <Col>
              <Form.Control
                type="number"
                placeholder="Max Experience"
                name="maxExperience"
                value={searchParams.maxExperience}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Form.Group controlId="formAcceptingNewClients" className="mt-3">
            <Form.Check
              type="switch"
              label="Show only coaches accepting new clients"
              name="acceptingNewClients"
              checked={searchParams.acceptingNewClients}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="btn-dark mt-3 me-2 w-100">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SearchFiltersModal;
