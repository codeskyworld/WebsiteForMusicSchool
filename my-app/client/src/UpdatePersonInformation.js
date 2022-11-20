import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FormGroup, Label, Input, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { generateVerificationCode } from "./verification code.js"

export default function UpdatePersonInformation() {

  const [isUpdate, setIsUpdate] = useState(false);

  const [surname, setSurname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [originalPassword, setOriginalPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [verificationCode, setVerificationCode] = useState(generateVerificationCode());
  const [inpVerCode, setInpVerCode] = useState("");
  
  let history = useHistory();

  useEffect(() => {
    async function checkUser() {
      let emailStorage = localStorage.getItem("email");
      if (!emailStorage) {
        alert("Sorry, You have not login!");
        history.push("/");
        return;
      }

      console.log("The value of localStorage is " + emailStorage);

      await axios.post("http://localhost:3001/checkCurrentInformation", {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          email: emailStorage,
        }
      })
        .then((res) => {
          setSurname(res.data[0].surname);
          setFirstName(res.data[0].firstName);
          setTelephone(res.data[0].telephone);
          

        })
        .catch((error) => alert("There is a mistake that." + error));
    };
    checkUser();
  }, []);


  const editUser = async () => {

    try {
      let emailStorage = localStorage.getItem("email");
      const res = await axios.post("http://localhost:3001/userEdition", {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          email: emailStorage,
          surname: surname,
          firstName: firstName,
          telephone: telephone,
          whetherBlacklist: false,
          originalPassword:originalPassword,
          password: newPassword,
        }
      })

      if (res.data.success) {
        alert(" user update succeed!");
        setIsUpdate(true);
      }
    }
    catch (error) { alert("Those passwords didn’t match. Try again.") };
  };


  const updateHandler = async (e) => {
    e.preventDefault();
    if (!surname || !firstName || !telephone || !originalPassword || !newPassword)
      alert("Please enter all information!");
    else if(verificationCode !== inpVerCode)
      alert('VERIFICATION CODE WRONG！');
    else {
      editUser();
      console.log("editUser has been executed!");
    }

  };

  if (isUpdate) {
    return < Redirect to="/" />;
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
          <h1 id="registerTitle">Update personal information</h1>
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
              readOnly="readOnly"
              placeholder={localStorage.getItem("email")}
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
              placeholder={surname}
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
              placeholder={firstName}
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
              placeholder={telephone}
              onChange={(event) => { setTelephone(event.target.value) }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="originalPassword" sm={5}>
            Original Password
          </Label>
          <Col sm={12}>
            <Input
              type="password"
              name="originalPassword"
              id="originalPassword"
              placeholder="Please input the original password"
              onChange={(event) => { setOriginalPassword(event.target.value) }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="newPassword" sm={6}>
            New PassWord
          </Label>
          <Col sm={12}>
            <Input
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="Please input the new password"
              onChange={(event) => {
                setNewPassword(event.target.value);
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
            onClick={updateHandler}>Update</button>
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