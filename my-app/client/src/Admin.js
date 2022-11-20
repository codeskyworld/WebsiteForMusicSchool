import React, { useState, useEffect } from "react";
//   import LinearGradient from 'react-native-linear-gradient';
import "./App.css";
import "./Raine.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Media, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { useHistory } from 'react-router-dom'
import { Confirm } from 'react-st-modal';
import axios from 'axios';
import img1 from "./img/Raine/img1.jpg"
import img2 from "./img/Raine/img2.png"
import img3 from "./img/Raine/img3.png"
import img4 from "./img/Raine/img4.jfif"
import img5 from "./img/Raine/img5.jfif"
import img6 from "./img/Raine/img6.jfif"
import img7 from "./img/Raine/img7.webp"
import background from "./img/Raine/bk2.jpg"


export default function Admin() {
    const [surname, setSurname] = useState("");
    const [firstName, setFirstName] = useState("");
    const [telephone, setTelephone] = useState("");

    const [userList, setUserList] = useState([]);
    const [courseList, setCourseList] = useState([]);
    const [gigList, setGigList] = useState([]);
    const [showCourseResults, setShowCourseResults] = useState(false);
    const [showGigResults, setShowGigResults] = useState(false);
    const [showUserBanResults, setShowUserBanResults] = useState(false);
    const [showUserDeletionResults, setShowUserDeletionResults] = useState(false);

    let history = useHistory();
    const email = localStorage.getItem("email");

    useEffect(() => {
        async function checkUser() {
            const emailStorage = localStorage.getItem("email");
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


    const getUsers = async () => {
        await axios.get("http://localhost:3001/users").then((response) => {
            setUserList(response.data);
        });
    };

    useEffect(() => {
        getUsers();
    }, []);


    const addToBlacklist = async (e, email) => {
        const result = await Confirm('Are you sure to add this user to the blacklist?',
            'Warning');
        if (result) {
            try {
                const res = await axios.post("http://localhost:3001/userEditInBlacklist", {
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    data: {
                        email: email,
                        whetherBlacklist: true,

                    }
                })

                if (res.data.success) {
                    window.location.reload();
                    return;
                }

            }
            catch (error) { alert("There is a mistake that." + error) };
        }
    };

    const removeFromBlacklist = async (e, email) => {
        const result = await Confirm('Are you sure to remove this user from the blacklist?',
            'Warning');
        if (result) {
            try {
                const res = await axios.post("http://localhost:3001/userEditInBlacklist", {
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    data: {
                        email: email,
                        whetherBlacklist: false,

                    }
                })

                if (res.data.success) {
                    window.location.reload();
                    return;
                }

            }
            catch (error) { alert("There is a mistake that." + error) };
        }
    };


    const handleDeleteUser = async (e, email) => {
        const result = await Confirm('Are you sure to remove this user?',
            'Warning');
        if (result) {
            await axios.post("http://localhost:3001/userDeletion", {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: {
                    email: email,
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

    const getCourse = async () => {
        await axios.get("http://localhost:3001/courses").then((response) => {
            setCourseList(response.data);
        });
    };

    useEffect(() => {
        getCourse();
    }, []);

    const getGig = () => {
        axios.get("http://localhost:3001/gigs").then((response) => {
            setGigList(response.data);
        });
    };

    useEffect(() => {
        getGig();
    }, []);

    let coursesToRender;
    if (courseList) {
        coursesToRender = courseList.map((course, index) => {
            return <div className="col text-center" key={index}>
                <img id="allfiles" src={`${course.picturePath}`} />
                <p>{course.courseName}</p>
                <div className="d-flex justify-content-center gap-3 mt-3 mb-3 ">
                    <div>
                        <Link to={`/courseDetail/${course.courseName}`} className="btn btn-primary">Detail</Link>
                    </div>
                </div>
            </div>;
        });
    }

    let gigsToRender;
    if (gigList) {
        gigsToRender = gigList.map((gig, index) => {
            return <div className="col text-center" key={index}>
                <img id="allfiles" src={`${gig.picturePath}`} />
                <p>{gig.gigName}</p>
                <div className="d-flex justify-content-center gap-3 mt-3 mb-3 ">
                    <div>
                        <Link to={
                            `/GigDetail/${gig.gigName}`} className="btn btn-primary">Detail</Link>
                    </div>
                </div>
            </div>;
        });
    }

    let usersDeletionToRender;
    if (userList) {
        usersDeletionToRender = userList.map((user, index) => {
            if (user.email !== "Teacher" && user.email !== "Administrator") {
                return <div className="container d-flex justify-content-center mt-4 mb-3" key={index}>
                    <div>
                        <Media >
                            <Media body>
                                <Media heading>
                                    ID: &nbsp; {user.id}
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button
                                        onClick={(e) => handleDeleteUser(e, user.email)}
                                        className="btn btn-danger">
                                        Delete
                                    </button>
                                </Media>
                                Email: {user.email}
                                <br />
                                SurName: {user.surname}
                                <br />
                                FirstName: {user.firstName}
                                <br />
                                Telephone: {user.telephone}
                            </Media>
                        </Media>
                    </div>
                </div>
            }
        });
    };

    let usersBanToRender;
    if (userList) {
        usersBanToRender = userList.map((user, index) => {
            if (user.email !== "Teacher" && user.email !== "Administrator") {
                return <div className="container d-flex justify-content-center mt-4 mb-3" key={index}>
                    <div>
                        <Media >
                            <Media body>
                                <Media heading>
                                    ID: &nbsp; {user.id}
                                    &nbsp;&nbsp;&nbsp;
                                    {user.whetherBlacklist ? <button
                                        onClick={(e) => removeFromBlacklist(e, user.email)}
                                        className="btn btn-success">
                                        Recover
                                    </button> : <button
                                        onClick={(e) => addToBlacklist(e, user.email)}
                                        className="btn btn-danger">
                                        BanToPost
                                    </button>}
                                    &nbsp;&nbsp;&nbsp;
                                </Media>
                                Email: {user.email}
                                <br />
                                SurName: {user.surname}
                                <br />
                                FirstName: {user.firstName}
                                <br />
                                Telephone: {user.telephone}
                            </Media>
                        </Media>
                    </div>
                </div>
            }
        });
    };

    const handleShowLessons = () => {
        if (!showCourseResults)
            setShowCourseResults(true);
        else
            setShowCourseResults(false);
    };

    const handleShowGigs = () => {
        if (!showGigResults)
            setShowGigResults(true);
        else
            setShowGigResults(false);
    };

    const handleShowUserBan = () => {
        if (!showUserBanResults)
            setShowUserBanResults(true);
        else
            setShowUserBanResults(false);
    };

    const handleShowUserDeletion = () => {
        if (!showUserDeletionResults)
            setShowUserDeletionResults(true);
        else
            setShowUserDeletionResults(false);
    };



    return (
        <div id="teacherStatus" style={{ backgroundImage: 'url(' + background + ')', backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
            <main className="container col-10 pb-4 pt-4" style={{ marginLeft: "8%", backgroundColor: "rgba(255,255,255,0.9)" }}>
                <div className="row">
                    <div style={{ float: "left", width: "55%", height: "300px" }}>
                        <ul id="list">
                            <li className="on">First Name: {firstName}</li>
                            <li>Last Name: {surname}</li>
                            <li>Phone: {telephone}</li>
                            <li>Email: {email}</li>
                        </ul>
                    </div>
                    <div style={{ float: "right", width: "45%" }}>
                        <img src={img1} className="img-fluid h-90 w-90" alt="We need an image" />
                    </div>
                </div>
                <div className="container pb-4 pt-4">
                    <div className="align-items-center row">
                        <div className="col">
                            <hr className="border-secondary mb-0 mt-0" />
                        </div>
                        <div className="col-auto">
                            <h2 className="fw-bold h4 mb-0 text-uppercase">OPEN</h2>
                        </div>
                        <div className="col">
                            <hr className="border-secondary mb-0 mt-0" />
                        </div>
                    </div>
                </div>
                <section>
                    <div className="container">
                        <div className="row row-cols-lg-2">
                            <div className="abc pb-4 pt-4" style={{ background: `url(${img2}) no-repeat center/100%` }}>
                                <button className="btn btn-outline-light col-3" onClick={handleShowLessons}>Lesson</button>
                            </div>
                            <div className="abc pb-4 pt-4" style={{ background: `url(${img3}) no-repeat center/100%` }}>
                                <button className="btn btn-outline-light col-3" onClick={handleShowGigs}>Gig</button>
                            </div>
                        </div>
                    </div>
                </section>


                <div className="container mt-5">
                    <div id="manyPicture" className="container">
                        {showCourseResults ? coursesToRender : null}
                    </div>
                </div>

                <div className="container mt-5">
                    <div id="manyPicture" className="container">
                        {showGigResults ? gigsToRender : null}
                    </div>
                </div>



                <div className="container pb-4 pt-4">
                    <div className="align-items-center row">
                        <div className="col">
                            <hr className="border-secondary mb-0 mt-0" />
                        </div>
                        <div className="col-auto">
                            <h2 className="fw-bold h4 mb-0 text-uppercase">Function</h2>
                        </div>
                        <div className="col">
                            <hr className="border-secondary mb-0 mt-0" />
                        </div>
                    </div>
                </div>
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="abc col-md-6 col-xl-3 pb-4 pt-4" style={{ background: `url(${img4}) no-repeat center/100%` }}>
                                <Link to="/fileUpload" className="btn btn-outline-light">Upload</Link>
                            </div>
                            <div className="abc col-md-6 col-xl-3 pb-4 pt-4" style={{ background: `url(${img5}) no-repeat center/100%` }}>
                                <Link to="/fileDownload" className="btn btn-outline-light">Download</Link>
                            </div>
                            <div className="abc col-md-6 col-xl-3 pb-4 pt-4" style={{ background: `url(${img2})` }}>
                                <Link to="/courseCreation" className="btn btn-outline-light">Create Lesson</Link>
                            </div>
                            <div className="abc col-md-6 col-xl-3 pb-4 pt-4" style={{ background: `url(${img3})` }}>
                                <Link to="/gigCreation" className="btn btn-outline-light">Create Gig</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="container pb-4 pt-4">
                    <div className="align-items-center row">
                        <div className="col">
                            <hr className="border-secondary mb-0 mt-0" />
                        </div>
                        <div className="col-auto">
                            <h2 className="fw-bold h4 mb-0 text-uppercase">User Management</h2>
                        </div>
                        <div className="col">
                            <hr className="border-secondary mb-0 mt-0" />
                        </div>
                    </div>
                </div>
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="abc col-lg-6 pb-4 pt-4" style={{ background: `url(${img6}) no-repeat center/100%` }}>
                                <button className="btn btn-outline-light col-3" onClick={handleShowUserBan}>Ban User</button>
                            </div>
                            <div className="abc col-lg-6 pb-4 pt-4" style={{ background: `url(${img7}) no-repeat center/100%` }}>
                                <button className="btn btn-outline-light col-3" onClick={handleShowUserDeletion}>Delete User</button>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mt-5">
                    <div id="manyPicture" className="container">
                        {showUserBanResults ? usersBanToRender : null}
                    </div>
                </div>

                <div className="container mt-5">
                    <div id="manyPicture" className="container">
                        {showUserDeletionResults ? usersDeletionToRender : null}
                    </div>
                </div>
            </main>
        </div>
    );
}