
import React, { useState, useEffect } from "react";
import { Container, Card, Button, CardGroup, Row, Col, Form } from "react-bootstrap";
import CarouselComp from "../components/Messaging";

const MessagePage = () => {
    return (
      <Container className="mt-5">
        <Card className="text-center bg-light">
          <Card.Body>
            <Card.Title>
              <h1>Messages</h1>
            </Card.Title>
            <Card.Text>This will be your messaging page.</Card.Text>
            <Button variant="primary" href="#">
              Send a message
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  };

export default MessagePage;