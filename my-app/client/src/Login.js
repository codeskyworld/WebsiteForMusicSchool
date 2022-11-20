import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FormGroup, Label, Input, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { generateVerificationCode } from "./verification code.js"


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [authentication, setAuthentication] = useState(false);

    const [verificationCode, setVerificationCode] = useState(generateVerificationCode());
    const [inpVerCode, setInpVerCode] = useState("");

    const loginHandler = async(e) => {
        e.preventDefault();
        if(verificationCode !== inpVerCode) {
         alert('Verification code error')
         return;
         }
        await axios.post("http://localhost:3001/login", {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            data: {
                email: email,
                password: password,
            }
        }).then((res) => {
            
            if (res.data.success) {
                console.log("email that will be storing is " + email);
                localStorage.setItem("email", email);
                setAuthentication(true);
                window.location.reload();
            }
        }).catch((error) => alert("Incorrect email or password"));
    };

    if (authentication) return <Redirect to="/" />;
    return (
        <div id="loginWindow" className="container d-flex justify-content-center pb-3">
            <br></br>
            <br></br>
            <br></br>
            <Form>
                <br></br>
                <br></br>
                <br></br>
                <div className="text-center">
                    <h1 id="loginTitle">Login</h1>
                </div>
                <FormGroup row>
                    <Label for="email" sm={4}>
                        Email
                    </Label>
                    <Col sm={12}>
                        <Input
                            type="text"
                            name="email"
                            id="email"
                            
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="password" sm={4}>
                        PassWord
                    </Label>
                    <Col sm={12}>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                        
                            onChange={(event) => {
                                setPassword(event.target.value);
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
              onClick={() => {
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
                    <button id="check" className="btn btn-outline-primary btn-lg w-100" onClick={loginHandler}>Login</button>
                    <Link to="/register" className="btn btn-outline-secondary btn-lg">Register</Link>
                    <Link to="/" className="btn btn-outline-danger btn-lg">Back</Link>         
                </div>
        </Form>
        </div>
    );
}