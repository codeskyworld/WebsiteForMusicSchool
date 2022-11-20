import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Media, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Confirm } from 'react-st-modal';

export default function MessageBoard() {

    let history = useHistory();
    const [whetherBlacklist, setWhetherBlacklist] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [loggedAsStudent, setLoggedAsStudent] = useState(false);
    const [loggedAsTeacher, setLoggedAsTeacher] = useState(false);
    const [loggedAsAdministrator, setLoggedAsAdministrator] = useState(false);
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        async function checkUser() {
            const emailStorage = localStorage.getItem("email");
            if (!emailStorage) {
                alert("Sorry, You have not login!");
                history.push("/");
                return;
            };

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
                    setWhetherBlacklist(res.data[0].whetherBlacklist);
                    return;
                })
                .catch((error) => alert("There is a mistake that." + error));
        };
        checkUser();
    }, []);

    useEffect(() => {
        let emailStorage = localStorage.getItem("email");
        if (emailStorage === "Administrator") {
            setLoggedAsAdministrator(true);
        }
        else if (emailStorage === "Teacher") {
            setLoggedAsTeacher(true);
        }
        else if (emailStorage) {
            setLoggedAsStudent(true);
        }
    }, []);



    const getMessage = async () => {
        await axios.get("http://localhost:3001/messages").then((response) => {
            setMessageList(response.data)
        });
    };

    useEffect(() => {
        getMessage();
    }, []);


    const addMessage = async () => {
        if(whetherBlacklist){
            alert("Sorry, You don't have permission to leave message!");
            history.push("/");
            return;
        }
        const emailStorage = localStorage.getItem("email");
        var current = new Date();
        var currentTime = current.toLocaleString();
        await axios.post("http://localhost:3001/messageCreation", {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            data: {
                email: emailStorage,
                title: title,
                description: description,
                time: currentTime,
            }
        })
            .then((res) => {
                if (res.data.success) {
                    alert(" Succeed to leave a message!");
                }
            })
            .catch((error) => alert("There is a mistake that." + error));


    };

    const CreateMessageHandler = (e) => {
        e.preventDefault();
        if (!title || !description) {
            alert("Please enter all information!");
        }

        else {
            addMessage();
            window.location.reload();
        }
    };

    const handleDeleteMessage = async (e, id) => {
        const result = await Confirm('Are you sure to remove this message?',
            'Warning');
        if (result) {
            await axios.post("http://localhost:3001/messageDeletion", {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: {
                    id: id,
                }
            }).then((res) => {
                if (res.data.success) {        
                    window.location.reload();
                    return;
                }
            }).catch((error) => alert("error is " + error));
        } else {
            return;
        }
    }


    let messagesToRender;

    if (messageList && (loggedAsStudent || loggedAsTeacher)) {
        messagesToRender = messageList.map((message, index) => {
            return <div className="container mt-4 mb-3" key={index}>
                <div>
                    <Media >
                        <Media body>
                            <Media heading>
                                {message.title}
                            </Media>
                            {message.description}
                        </Media>
                    </Media>
                </div>
                <div className="mt-4 mb-4"><p>User: {message.email}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  time: {message.time}</p></div>
            </div>

        });
    }

    if (messageList && loggedAsAdministrator) {

        messagesToRender = messageList.map((message, index) => {
            return <div className="container mt-4 mb-4" key={index}>
                <div>
                    <Media >
                        <Media body>
                            <Media heading>
                                {message.title}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button
                                    onClick={(e) => handleDeleteMessage(e, message.id)}
                                    className="btn btn-danger">
                                    Delete
                                </button>
                            </Media>
                            {message.description}
                        </Media>
                    </Media>
                </div>
                <div className="mt-4 mb-4"><p>User: {message.email}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  time: {message.time}</p></div>
            </div>
        });
    }



    return (
        <div id="courseCreationWindow" className="container justify-content-center mt-3">
            <div className="text-center">
                <h1 id="registerTitle">Message Board</h1>
            </div>
            {messagesToRender}
            <br />
            <br />
            <div className="container"><h5>Your  Message</h5></div>
            <Form className="w-100 mt-2">
                <FormGroup>
                    <Label for="title" sm={5}>
                        Title
                    </Label>
                    <Col sm={12}>
                        <Input
                            type="text"
                            name="title"
                            id="title"
                            onChange={(event) => { setTitle(event.target.value) }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Label for="description" sm={5}>Description</Label>
                    <Col sm={12}>
                        <Input type="textarea" name="description" id="description"
                            onChange={(event) => { setDescription(event.target.value) }} />
                    </Col>
                </FormGroup>

                <div className="d-grid gap-3 mt-5">
                    <button className="btn btn-outline-primary btn-lg w-100"
                        onClick={CreateMessageHandler}>Leave a message</button>
                    <Link to="/" className="btn btn-outline-danger btn-lg">Back</Link>
                </div>
            </Form>

        </div>
    );
}