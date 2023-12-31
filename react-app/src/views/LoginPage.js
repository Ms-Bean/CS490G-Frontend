import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <Container className="my-5 p-4 bg-primary text-white rounded w-50 mx-auto">
      <Container className="">
        <h1 className="mt-2 mb-2 text-center">Sign In</h1>
        <div className="mt-3">
          <p className="mb-0  text-center">
            Don't have an account?&nbsp;
            <a href="/registration" className="text-white fw-bold">
               Sign Up
            </a>
          </p>
        </div>
      </Container>
      <Container className="mt-3 justify-content-center">
        <Row className="bg-light text-dark rounded p-4">
          <Col>
            <Row>
              <Col>
                <LoginForm />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default LoginPage;
