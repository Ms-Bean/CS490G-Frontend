import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const SearchFiltersModal = ({ show, handleClose, searchParams, handleChange, handleSubmit }) => {
  return (
    <Modal show={show} onHide={handleClose}>
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SearchFiltersModal;
