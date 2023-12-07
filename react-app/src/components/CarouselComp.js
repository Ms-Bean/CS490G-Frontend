import React from "react";
import { Carousel, Container } from "react-bootstrap";
import "../css/CarouselComp.css";

const CarouselComp = () => {
  return (
    <Container className="align-center-self my-5">
      <div className="col-md-8 mx-auto">
        <Carousel>
          <Carousel.Item interval={10000}>
            <img className="d-block w-100" src="/static_images/s1.jpg" alt="Dwayne Johnson before and after" />
            <Carousel.Caption>
              <div id="caption">
                <h3>Dwayne "The Rock" Johnson</h3>
              </div>
              <div id="caption">
                <p>
                  This hollywood star has made miraculous improvement within 18 months and was able to turn over 120 pounds of fat into lean
                  muscle with the help of Moxi!
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={10000}>
            <img className="d-block w-100" src="/static_images/s2.jpg" alt="Shonda Rhimes before and after" />
            <Carousel.Caption>
              <div id="caption">
                <h3>Shonda Rhimes</h3>
              </div>
              <div id="caption">
                <p>Moxi allowed Shonda to lose 100 pounds without completely abandoning her diet and her favorite foods.</p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={10000}>
            <img className="d-block w-100" src="/static_images/s3.jpg" alt="Kelly Osborne before and after" />
            <Carousel.Caption>
              <div id="caption">
                <h3>Kelly Osborne</h3>
              </div>
              <div id="caption">
                <p>
                  When other, unhealthy weight loss methods let her down, Kelly turned to Moxi to help her attain and sustain a figure that
                  gives her confidence.
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </Container>
  );
};

export default CarouselComp;
