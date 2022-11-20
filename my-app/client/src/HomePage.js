import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel, Navbar, Container, Row, Nav, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import fullBodyPhoto from "./img/fullBodyPhoto.jpg"
import fullBodyPhoto1 from "./img/fullBodyPhoto1.jpg"
import fullBodyPhoto2 from "./img/fullBodyPhoto2.jpg"
import img1 from "./img/img1.png"
import img2 from "./img/img2.png"
import img3 from "./img/img3.png"
import music from "./music/JustinBieber.mp3"
import "./James.css"
import "./JAMES.js"
import "./James1.js"
export default function HomePage() {

  return (
    <div id="homePage" className="homePage">
       <canvas id="starCanvas" className="homepageCanvas">  </canvas>
      <Carousel className="container d-flex justify-content-center">
        <Carousel.Item>
          <img
            src={fullBodyPhoto}
            alt="First slide"
          />
          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={fullBodyPhoto1}
            alt="Second slide"
          />

          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={fullBodyPhoto2}
            alt="Third slide"
          />
          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div id="musicPlayer" className="container d-flex justify-content-center mt-3 text">
        <canvas id="canvas">Canvas not supported.</canvas>
          <div class="mb-wrap mb-style-5">
					    <blockquote >
						    <p>There is no point in using the word 'impossible' <span>Guitar creates endless possibilities</span></p>
				      </blockquote>
			    </div>
      </div>

      <div className="container">
        <div id="threePicture" className="row align-items-start">
          <div className="col">
            <img
              src={img2}
            />
            <p>Price</p>
            <Link to="/pricing" className="btn btn-success">Click</Link>
          </div>
          <div className="col">
            <img
              src={img1}
            />
            <p>Lessons</p>
            <Link to="/GuitarLessons" className="btn btn-primary">Click</Link>
          </div>
          <div className="col">
            <img
              src={img3}
            />
            <p>About me</p>
            <Link to="/about" className="btn btn-danger">Click</Link>

          </div>
        </div>
      </div>

       <div  className="container mt-4">
        <audio id="audio1" src={music}   preload="auto"></audio>
      </div>

      <div className="tail mt-4" id="homePageLastP">
        <p>Would you like to know more about Jordan? <a href="/About">Click here</a></p>
      </div>

    </div>
  );
}