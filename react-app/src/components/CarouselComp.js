import React from 'react'
import { Carousel } from 'react-bootstrap'
import '../css/CarouselComp.css'

const CarouselComp = () => {
  return (
    <div class="row row-centered">
      <div class="col-md-8 mx-auto">
        <Carousel>
      <Carousel.Item interval={10000}>
        <img
            className="d-block w-100"
            src={require("./s1.jpg")}
            alt=""/>
        <Carousel.Caption>
          <div id="caption">
          <h3>Dwayne "The Rock" Johnson</h3>
          </div>
          <div id="caption">
          <p>This hollywood star has made miraculous improvement within 18 months and was able to turn over 120 pounds of fat into lean muscle with the help of Moxi!</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={10000}>       
        <img
            className="d-block w-100"
            src={require("./s2.jpg")}
            alt=""/>
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
        <img
            className="d-block w-100"
            src={require("./s3.jpg")}
            alt=""/>        
            <Carousel.Caption>
          <div id="caption">
          <h3>Kelly Osborne</h3>
          </div>
          <div id="caption">
          <p>When other, unhelthy weight loss methods let her down, Kelly turned to Moxi to help her attain and sustain a figure that gives her confidence.</p>
          </div>
      </Carousel.Caption>
    </Carousel.Item>
    </Carousel>
    </div>
    </div>
  )
}

export default CarouselComp;
