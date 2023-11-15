import React from "react";
import { Container, Card, Button, CardGroup, Row, Col } from "react-bootstrap";
import CarouselComp from "../components/CarouselComp";

const HomePage = () => {
  return (
<<<<<<< HEAD
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
=======
    <div>
      <CarouselComp />
      <div className="bg-light py-5 text-center">
  <h2 className="text-center text-dark mb-4">Work with the Best Trainers</h2>
  <div className="container d-flex justify-content-center align-items-center" style={{ overflowX: 'auto'}}>
    <img src="hpp1.webp" alt="Trainer 1" className="trainer-image" style={{ margin: '0 20px' }} />
    <img src="hpp2.webp" alt="Trainer 2" className="trainer-image" style={{ margin: '0 20px' }} />
    <img src="hpp3.webp" alt="Trainer 3" className="trainer-image" style={{ margin: '0 20px' }} />
    <img src="hpp4.webp" alt="Trainer 4" className="trainer-image" style={{ margin: '0 20px' }} />
    <img src="hpp5.webp" alt="Trainer 5" className="trainer-image" style={{ margin: '0 20px' }} />
    <img src="hpp6.webp" alt="Trainer 6" className="trainer-image" style={{ margin: '0 20px' }} />
  </div>
</div>

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
              You don't have to do it alone! The path to your goal isn't necessarily straightforward so allow us to guide you there. Book an
              appointment today with a coach near you!
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
>>>>>>> c0baa94ff012a1f6eb6f1968d574de76539f4c3a
      </CardGroup>
      <br /> <br />
    </div>
  );
};

export default HomePage;
