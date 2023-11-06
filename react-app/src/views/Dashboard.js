import React from "react";
import { Container, Card, Button } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Container className="mt-5">
      <Card className="text-center bg-light">
        <Card.Body>
          <Card.Title>
            <h1>Dashboard</h1>
          </Card.Title>
          <Card.Text>This will be your dashboard.</Card.Text>
          <Button variant="primary" href="#">
            Let's Go!
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
