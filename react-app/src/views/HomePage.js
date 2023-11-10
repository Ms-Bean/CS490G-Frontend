import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import CarouselComp from "../components/CarouselComp"

const HomePage = () => {
  return (
    <Container className="mt-5">
      <CarouselComp/>
      <br/>
        <Card className="text-center bg-light">
        <Card.Body>
          <Card.Title>
            <h1>Welcome to Moxi!</h1>
          </Card.Title>
          <Card.Text>This is an exercise and coaching app.</Card.Text>
          <Button variant="primary" href="/registration">
            Get Started
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HomePage;
