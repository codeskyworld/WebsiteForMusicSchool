import React, { useState} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FormGroup, Label, Input, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios'
import { generateVerificationCode } from "./verification code.js"


export default function Register() {

  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [surname, setSurname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [verificationCode, setVerificationCode] = useState(generateVerificationCode());
  const [inpVerCode, setInpVerCode] = useState("");
  
  const addUser = async () => {
    await axios.post("http://localhost:3001/register", {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        email: email,
        surname: surname,
        firstName: firstName,
        telephone: telephone,
        whetherBlacklist:false,
        password: password,        
      }
    })
      .then((res) => {
        if (res.data.success) {
          alert("Register succeed! Please Login.");
          setIsRegister(true);
        }
      })
      .catch((error) => alert("There is a mistake that." + error));
  };

  const registerHandler = async(e) => {
    e.preventDefault();
    if (!email || !surname || !firstName || !telephone || !password || !confirmpassword)
      alert("Please enter all information!");
    else if(verificationCode !== inpVerCode)
      alert('Verification code error！');
    else if (password !== confirmpassword)
      alert("Those passwords didn’t match. Try again.");
    else {
      addUser();
    }
  };


  if (isRegister) {
    return < Redirect to="/login" />;
  }
  return (
    <div id="registerWindow" className="container d-flex justify-content-center mb-3">

      <br></br>
      <br></br>
      <br></br>
      <Form>
        <br></br>
        <br></br>
        <br></br>
        <div className="text-center">
          <h1 id="registerTitle">Register</h1>
        </div>
        <FormGroup row>
          <Label for="email" sm={5}>
            Email
          </Label>
          <Col sm={12}>
            <Input
              type="text"
              name="email"
              id="email"

              onChange={(event) => { setEmail(event.target.value) }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="surname" sm={5}>
            Surname
          </Label>
          <Col sm={12}>
            <Input
              type="text"
              name="surname"
              id="surname"
              onChange={(event) => { setSurname(event.target.value) }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="firstName" sm={5}>
            FirstName
          </Label>
          <Col sm={12}>
            <Input
              type="text"
              name="firstName"
              id="firstName"

              onChange={(event) => { setFirstName(event.target.value) }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="telephone" sm={5}>
            Telephone
          </Label>
          <Col sm={12}>
            <Input
              type="text"
              name="telephone"
              id="telephone"

              onChange={(event) => { setTelephone(event.target.value) }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="password" sm={5}>
            PassWord
          </Label>
          <Col sm={12}>
            <Input
              type="password"
              name="password"
              id="password"

              onChange={(event) => { setPassword(event.target.value) }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="confirmPassword" sm={6}>
            Confirm PassWord
          </Label>
          <Col sm={12}>
            <Input
              type="password"
              //name="confirmPassword"
              id="confirmPassword"

              onChange={(event) => {
                setConfirmpassword(event.target.value);
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="code" sm={4}>
            Verification
          </Label>
          <Col sm={12}>
            <Input
              type="button"
             // id="code"
              value={verificationCode}
              onClick={() =>{
                setVerificationCode(generateVerificationCode());
              }}  
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="input" sm={4}>
            Verification
          </Label>
          <Col sm={12}>
            <Input
              type="text"
              id="input"
              value={inpVerCode}
              onChange={(e) => {
                setInpVerCode(e.target.value);
              }}
              placeholder="Please enter the verification code"
            />
          </Col>
        </FormGroup>
        <br></br>
        <br></br>
        <div className="d-grid gap-3">
          <button id="check" className="btn btn-outline-primary btn-lg w-100"
            onClick={registerHandler}>Register</button>
          <Link to="/" className="btn btn-outline-danger btn-lg">Back</Link>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </Form>
    </div>
  );
}