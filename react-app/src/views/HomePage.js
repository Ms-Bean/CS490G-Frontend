import React from "react";
import { Container, Row, Col, Card, Button, Navbar, Nav } from "react-bootstrap";
import "../css/HomePage.css";
import "../css/ExerciseBank.css";

const trainers = [
  {
    name: "Jake Opitz",
    description: "Specialist in strength training and nutrition.",
    image: "/static_images/trainer_1.png",
  },
  {
    name: "Marc Edwards",
    description: "Expert in cardio fitness and endurance.",
    image: "/static_images/trainer_2.png",
  },
  {
    name: "Priya Singh",
    description: "Holistic fitness coach with a focus on wellness.",
    image: "/static_images/trainer_3.png",
  },
];

const HomePage = () => {
  return (
    <>
      <div
        className="hero-section position-relative text-white text-center d-flex align-items-center justify-content-center"
        style={{ height: "60vh" }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: 'url("/static_images/hp_hero.webp")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: -1,
            filter: "brightness(50%)",
          }}
        ></div>

        <div style={{ zIndex: 1 }}>
          <h1>Welcome to Moxi Fitness</h1>
          <p>Transform your life with personalized training and real results.</p>
          <Button className="bg-light text-dark" href="/registration">
            <strong>Join Now</strong>
          </Button>
        </div>
      </div>

      <Container className="my-5">
        <Row className="align-items-center">
          <Col lg={6} className="mb-3 mb-lg-0">
            <img src="/static_images/hp_small.png" alt="Gym Interior" className="w-100 rounded" />
          </Col>
          <Col lg={6}>
            <h2>Advanced Fitness Tracking</h2>
            <p>
              Our app provides comprehensive fitness tracking to monitor your progress, set goals, and keep you motivated on your fitness
              journey.
            </p>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="mb-4 pt-3 text-center">
          <Col>
            <h2>Meet Our Trainers</h2>
          </Col>
        </Row>
        <Row>
          {trainers.map((trainer, index) => (
            <Col md={4} key={index}>
              <Card className="mb-4">
                <Card.Img variant="top" src={trainer.image} />
                <Card.Body>
                  <Card.Title>{trainer.name}</Card.Title>
                  <Card.Text>{trainer.description}</Card.Text>
                  <Button variant="outline-secondary" className="w-100">
                    View Profile
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <div className="bg-secondary py-5">
        <Container className="text-center text-light">
          <Row>
            <Col>
              <h2>Join Our Community</h2>
              <p>Sign up for our newsletter to get the latest updates and offers.</p>
              <Button variant="dark">Subscribe</Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default HomePage;
