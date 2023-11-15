import React from "react";
import { Container, Card, Button, CardGroup } from "react-bootstrap";
import CarouselComp from "../components/CarouselComp"
import Barbell from "../components/static_images/barbell.jpg"
import Coach from "../components/static_images/coach_whistle.jpg"
import LineGraph from "../components/static_images/linegraph.jpg"

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
          <Card.Text>Moxi is an all-in-one exercise and coaching app designed to help you reach you personal fitness goals.</Card.Text>
          <Button variant="primary" href="/registration">
            Get Started
          </Button>
        </Card.Body>
      </Card>
      <br/>
      <CardGroup>
      <Card>
        <Card.Img variant="top" src={Barbell} />
        <Card.Body>
          <Card.Title>Personal Workout Plans</Card.Title>
          <Card.Text>
            Try one of our workout plans designed by professional trainers or create a plan precisely tailored to your needs.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img variant="top" src={Coach} />
        <Card.Body>
          <Card.Title>Dedicated Coaches</Card.Title>
          <Card.Text>
            You don't have to do it alone! The path to your goal isn't necessarily straightforward so allow us to guide you there. <a href="/registration"> Book an appointment today</a> with a coach near you!
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img variant="top" src={LineGraph} />
        <Card.Body>
          <Card.Title>Track Progress</Card.Title>
          <Card.Text>
            Easily track your progress and reach your milestones right from the in-app dashboard!
          </Card.Text>
        </Card.Body>
      </Card>
      </CardGroup>
      <br/> <br/>
    </Container>
  );
};

export default HomePage;
