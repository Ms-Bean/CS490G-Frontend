import React from "react";
import { Container, Card, Button, CardGroup, Row, Col } from "react-bootstrap";
import CarouselComp from "../components/CarouselComp";
import "../css/HomePage.css";

const HomePage = () => {
  return (
    <div>
      <CarouselComp />
      <div className="trainers-section">
        <h2 className="section-title">Work with the Best Trainers</h2>
        <div className="trainers-container">
          <img src="hpp1.webp" alt="Trainer 1" className="trainer-image" />
          <img src="hpp2.webp" alt="Trainer 2" className="trainer-image" />
          <img src="hpp3.webp" alt="Trainer 3" className="trainer-image" />
          <img src="hpp4.webp" alt="Trainer 4" className="trainer-image" />
          <img src="hpp5.webp" alt="Trainer 5" className="trainer-image" />
          <img src="hpp6.webp" alt="Trainer 6" className="trainer-image" />
        </div>
      </div>
      <Container>
        <CardGroup className="py-5">
          <Card>
            <Card.Img variant="top" src="/static_images/barbell.jpg" />
            <Card.Body>
              <Card.Title>Personal Workout Plans</Card.Title>
              <Card.Text>
                Try one of our workout plans designed by professional trainers or create a plan precisely tailored to your needs.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src="/static_images/coach_whistle.jpg" />
            <Card.Body>
              <Card.Title>Dedicated Coaches</Card.Title>
              <Card.Text>
                You don't have to do it alone! The path to your goal isn't necessarily straightforward so allow us to guide you there.{" "}
                <a href="/registration">Book an appointment today</a> with a coach near you!
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src="/static_images/linegraph.jpg" />
            <Card.Body>
              <Card.Title>Track Progress</Card.Title>
              <Card.Text>Easily track your progress and reach your milestones right from the in-app dashboard!</Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
        <Card>
          <Card.Body>
            <Card.Title>Become a Coach!</Card.Title>
            <Card.Text>
              Moxi provides trainers with an efficient and sophisticated way to manage appointments, bill clients, and track client progress.
              <br />
              <br />
              <b>The conditioning does not stop with appointments!</b> Moxi allows coaches to assign workout plans to their clients and
              communicate with them along the way. This builds trust, retention, and better habits while coaches are not physically with
              their clients. Because of this, trainers saw consistent progress amongst their clientele when they switched to Moxi. <br />
              <br />
              Do you have what it takes to be a Moxi trainer? <a href="/registration">Become a coach today!</a>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
      <p />
    </div>
  );
};

export default HomePage;
