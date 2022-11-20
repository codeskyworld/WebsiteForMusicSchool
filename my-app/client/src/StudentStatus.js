import React, { useState, useEffect} from "react";
//   import LinearGradient from 'react-native-linear-gradient';
import "./App.css";
import "./Raine.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import img2 from "./img/Raine/img2.png"
import img3 from "./img/Raine/img3.png"
import img4 from "./img/Raine/img4.jfif"
import img5 from "./img/Raine/img5.jfif"
import photobird from "./img/photobird.jpg"
import background from "./img/Raine/bk2.jpg"



export default function StudentStatus() {

    const [surname, setSurname] = useState("");
    const [firstName, setFirstName] = useState("");
    const [telephone, setTelephone] = useState("");

    const [courseList, setCourseList] = useState([]);
    const [gigList, setGigList] = useState([]);

    const [courseBookingList, setCourseBookingList] = useState([]);
    const [studentCourseList, setStudentCourseList] = useState([]);

    const [gigBookingList, setGigBookingList] = useState([]);
    const [studentGigList, setStudentGigList] = useState([]);

    const [showCourseResults, setShowCourseResults] = useState(false);
    const [showGigResults, setShowGigResults] = useState(false);

    let history = useHistory();
    const email = localStorage.getItem("email");

    useEffect(() => {
        async function getStudentBookingCourses() {
            const emailStorage = localStorage.getItem("email");
            if (!emailStorage) {
                alert("Sorry, You have not login!");
                history.push("/");
                return;
            };

            await axios.post("http://localhost:3001/getStudentBookingCourses", {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: {
                    email: emailStorage,
                }
            })
                .then((res) => {
                    setCourseBookingList(res.data);
                    let tempStudentCourseList = courseBookingList.map((element) => { return element.courseName });
                    setStudentCourseList(tempStudentCourseList);

                    // console.log("courseBookingList is " + courseBookingList);
                    // console.log("tempStudentCourseList is " + tempStudentCourseList);
                    // console.log("res.data is " + res.data);
                })
                .catch((error) => alert("There is a mistake that." + error));
        };
        getStudentBookingCourses();
    }, [courseList]);



    useEffect(() => {
        async function getStudentBookingGigs() {
            const emailStorage = localStorage.getItem("email");
            if (!emailStorage) {
                alert("Sorry, You have not login!");
                history.push("/");
                return;
            };

            await axios.post("http://localhost:3001/getStudentBookingGigs", {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: {
                    email: emailStorage,
                }
            })
                .then((res) => {
                    setGigBookingList(res.data);
                    let tempStudentGigList = gigBookingList.map((element, index) => { return element.gigName });
                    setStudentGigList(tempStudentGigList);
                })
                .catch((error) => alert("There is a mistake that." + error));
        };
        getStudentBookingGigs();
    }, [gigList]);



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
                    setSurname(res.data[0].surname);
                    setFirstName(res.data[0].firstName);
                    setTelephone(res.data[0].telephone);
                })
                .catch((error) => alert("There is a mistake that." + error));
        };
        checkUser();
    }, []);

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
            if (studentCourseList.includes(course.courseName)) {
                return <div className="col text-center" key={index}>
                    <img id="allfiles" src={`${course.picturePath}`} />
                    <p>{course.courseName}</p>
                    <div className="d-flex justify-content-center gap-3 mt-3 mb-3 ">
                        <div>
                            <Link to={`/courseDetail/${course.courseName}`} className="btn btn-primary">Detail</Link>
                        </div>
                    </div>
                </div>;
            }
        });
    }

    let gigsToRender;
    if (gigList) {
        gigsToRender = gigList.map((gig, index) => {
            if (studentGigList.includes(gig.gigName)) {
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

    return (
        <div id="studentStatus" style={{ backgroundImage: 'url(' + background + ')', backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
            <main className="container col-10 pb-4 pt-4" style={{ marginLeft: "8%", backgroundColor: "rgba(255,255,255,0.9)" }}>
                <div className="row">
                    <div style={{ float: "left", width: "60%", height: "300px" }}>
                        <ul id="list">
                            <li className="on">First Name: {firstName} </li>
                            <li>Last Name: {surname}</li>
                            <li>PH: {telephone}</li>
                            <li>Email: {email}</li>

                        </ul>
                    </div>
                    <div style={{ float: "right", width: "30%" }}>
                        <img src={`${photobird}`} />
                    </div>
                </div>
                <div className="container pb-4 pt-4">
                    <div className="align-items-center row">
                        <div className="col">
                            <hr className="border-secondary mb-0 mt-0" />
                        </div>
                        <div className="col-auto">
                            <h2 className="fw-bold h4 mb-0 text-uppercase">Current</h2>
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
                                <Link to="/bookingCourses" className="btn btn-outline-light">Book Lesson</Link>
                            </div>
                            <div className="abc col-md-6 col-xl-3 pb-4 pt-4" style={{ background: `url(${img3})` }}>
                                <Link to="/bookingGigs" className="btn btn-outline-light">Book Gig</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="pb-5 pt-5 text-center" style={{ backgroundColor: "rgba(255,255,255,0.9)" }}>
                    <div className="container pb-4 pt-4">
                        <div className="row">
                            <div className="col-lg-8 ms-auto me-auto py-3">
                                <h2 className="text-dark">Do you want to report someone? <a href="/Register" >Click Here </a></h2>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}