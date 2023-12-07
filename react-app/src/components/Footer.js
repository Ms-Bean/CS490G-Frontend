import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <div className="text-dark mt-3 py-5" style={{ backgroundColor: "#ccd1d4" }}>
        <Container>
          <Row className="justify-content-center">
            <Col sm={6} md={6} lg={2} mb={5}>
              <div className="footer-title">
                <h6>Who We Are</h6>
              </div>
              <div className="footer-content text-muted">
                <a href="/" className="text-muted">
                  <small>About</small>
                </a>
                <br />
                <a href="/" className="text-muted">
                  <small>Team</small>
                </a>
                <br />
                <a href="/" className="text-muted">
                  <small>Careers</small>
                </a>
                <br />
                <a href="/" className="text-muted">
                  <small>Press</small>
                </a>
              </div>
            </Col>

            <Col sm={6} md={6} lg={3} mb={5}>
              <div className="footer-title">
                <h6>Latest News</h6>
              </div>
              <div className="footer-content text-muted">
                <p>
                  <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small>
                </p>
                <p>
                  <small>Pellentesque et pulvinar enim. Quisque at tempor ligula Natus error sit voluptatem.</small>
                </p>
              </div>
            </Col>

            <Col sm={6} md={6} lg={2} mb={5}>
              <div className="footer-title">
                <h6>Contact Us</h6>
              </div>
              <div className="footer-content text-muted">
                <small>154 Summit Street</small>
                <br />
                <small>Newark, NJ 07102</small>
                <br />
                <small>Phone : +213 (0) 123 456 789</small>
                <br />
                <small>Email : cs490group4@njit.edu</small>
                <br />
              </div>
            </Col>
            <Col sm={6} md={6} lg={2} mb={5}>
              <div className="footer-title">
                <h6>Social Media</h6>
              </div>
              <div className="footer-content text-muted">
                <a href="/" className="text-muted">
                  <small>Instagram</small>
                </a>
                <br />
                <a href="/" className="text-muted">
                  <small>X</small>
                </a>
                <br />
                <a href="/" className="text-muted">
                  <small>Facebook</small>
                </a>
                <br />
                <a href="/" className="text-muted">
                  <small>TikTok</small>
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="text-center py-3" style={{ backgroundColor: "#1b1b1b" }}>
        <Container>
          <Row>
            <Col>
              <p className="text-light">
                <small>© 2023 All Rights Reserved</small>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Footer;
