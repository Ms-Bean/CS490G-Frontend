import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { State } from "country-state-city";

const SearchFiltersModal = ({ show, handleClose, searchParams, handleChange, handleSubmit }) => {
  const states = State.getStatesOfCountry("US");
  var theStates = []
  states.forEach((state)=> theStates[theStates.length]= {value:state.isoCode, label:state.name, name:"state"})

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
          <Row>
          <Form.Group className="mb-0">
              <Form.Label>Specialization</Form.Label>
              <Select
                isMulti
                //options
                //value={selectedEquipmentItems}
                //onChange={handleEquipmentChange}
                name="equipmentItems"
              />{" "}
            </Form.Group>
          </Row>
          <br/>
          <Row>
            <Col>
            <Form.Label>City</Form.Label>
            <Form.Control
            type="text"
            placeholder="City"
            name="city"
            value={searchParams.city}
            onChange={handleChange}
            />
            </Col>
            <Col>
            <Form.Group>
            <Form.Label>State</Form.Label>
            <Form.Select
            placeholder="State"
            name="state"
            value={searchParams.state}
            onChange={handleChange}
            >
            <option value={searchParams.state}>{searchParams.state}</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.name}>
                {state.name}
              </option>
            ))}
            </Form.Select>
            </Form.Group>
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
