import React, { useState, useEffect } from "react";
//   import LinearGradient from 'react-native-linear-gradient';
import "./App.css";
import "./Raine.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Media, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { useHistory } from 'react-router-dom';
import { Confirm } from 'react-st-modal';
import axios from 'axios';
import img1 from "./img/Raine/img1.jpg";
import img2 from "./img/Raine/img2.png";
import img3 from "./img/Raine/img3.png";
import img4 from "./img/Raine/img4.jfif";
import img5 from "./img/Raine/img5.jfif";
import background from "./img/Raine/bk2.jpg";



export default function TeacherStatus() {
    const [surname, setSurname] = useState("");
    const [firstName, setFirstName] = useState("");
    const [telephone, setTelephone] = useState("");

    const [courseList, setCourseList] = useState([]);
    const [gigList, setGigList] = useState([]);
    const [courseBookingList, setCourseBookingList] = useState([]);
    const [gigBookingList, setGigBookingList] = useState([]);


    const [showCourseResults, setShowCourseResults] = useState(false);
    const [showGigResults, setShowGigResults] = useState(false);
    const [showCourseBookingResults, setShowCourseBookingResults] = useState(false);
    const [showGigBookingResults, setShowGigBookingResults] = useState(false);
    const [showArchivingLessons, setShowArchivingLessons] = useState(false);
    const [showArchivingGigs, setShowArchivingGigs] = useState(false);

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



    const getCourse = async () => {
        await axios.get("http://localhost:3001/courses").then((response) => {
            setCourseList(response.data)
        })
            .catch((error) => alert("There is a mistake that." + error));;
    };

    useEffect(() => {
        getCourse();
    }, []);

    const getGig = () => {
        axios.get("http://localhost:3001/gigs").then((response) => {
            setGigList(response.data)
        })
            .catch((error) => alert("There is a mistake that." + error));;
    };

    useEffect(() => {
        getGig();
    }, []);


    const getCourseBooking = async () => {
        await axios.get("http://localhost:3001/coursesBooking").then((response) => {
            setCourseBookingList(response.data)
        })
            .catch((error) => alert("There is a mistake that." + error));;
    };

    useEffect(() => {
        getCourseBooking();
    }, []);

    const getGigBooking = async () => {
        await axios.get("http://localhost:3001/gigsBooking").then((response) => {
            setGigBookingList(response.data)
        })
            .catch((error) => alert("There is a mistake that." + error));;
    };

    useEffect(() => {
        getGigBooking();
    }, []);


    const ArchiveCourseBooking = async (e, id) => {
        const result = await Confirm('Are you sure to archive this course booking?',
            'Noticing');
        if (result) {
            try {
                const res = await axios.post("http://localhost:3001/archivingCoursesBooking", {
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    data: {
                        id: id,
                        currentStatus: "archiving",

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


    const RecoverCourseBooking = async (e, id) => {
        const result = await Confirm('Are you sure to recover this course booking from archiving?',
            'Noticing');
        if (result) {
            try {
                const res = await axios.post("http://localhost:3001/archivingCoursesBooking", {
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    data: {
                        id: id,
                        currentStatus: "pending",

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


    const ArchiveGigBooking = async (e, id) => {
        const result = await Confirm('Are you sure to archive this gig booking?',
            'Noticing');
        if (result) {
            try {
                const res = await axios.post("http://localhost:3001/archivingGigsBooking", {
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    data: {
                        id: id,
                        currentStatus: "archiving",

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


    const RecoverGigBooking = async (e, id) => {
        const result = await Confirm('Are you sure to recover this gig booking from archiving?',
            'Noticing');
        if (result) {
            try {
                const res = await axios.post("http://localhost:3001/archivingGigsBooking", {
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    data: {
                        id: id,
                        currentStatus: "pending",

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



    let coursesBookingToRender;
    if (courseBookingList) {
        coursesBookingToRender = courseBookingList.map((courseBooking, index) => {
            if (courseBooking.currentStatus !== "archiving") {
                return <div className="container d-flex justify-content-center mt-4 mb-3" key={index}>
                    <div>
                        <Media >
                            <Media body>
                                <Media heading>
                                    ID: &nbsp; {courseBooking.id}
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button
                                        onClick={(e) => handleDeleteCourseBooking(e, courseBooking.email, courseBooking.courseName)}
                                        className="btn btn-danger">
                                        Delete
                                    </button>
                                </Media>
                                Email: {courseBooking.email}
                                <br />
                                CourseName: {courseBooking.courseName}
                                <br />
                                BookingTime: {courseBooking.bookingTime}
                            </Media>
                        </Media>
                    </div>
                </div>
            }
        });
    };

    let gigsBookingToRender;
    if (gigBookingList) {
        gigsBookingToRender = gigBookingList.map((gigBooking, index) => {
            if (gigBooking.currentStatus !== "archiving") {
                return <div className="container d-flex justify-content-center mt-4 mb-3" key={index}>
                    <div>
                        <Media >
                            <Media body>
                                <Media heading>
                                    ID: &nbsp; {gigBooking.id}
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button
                                        onClick={(e) => handleDeleteGigBooking(e, gigBooking.email, gigBooking.gigName)}
                                        className="btn btn-danger">
                                        Delete
                                    </button>
                                </Media>
                                Email: {gigBooking.email}
                                <br />
                                GigName: {gigBooking.gigName}
                                <br />
                                BookingTime: {gigBooking.bookingTime}
                            </Media>
                        </Media>
                    </div>
                </div>
            }
        });
    };

    let coursesArchivingToRender;
    if (courseBookingList) {
        coursesArchivingToRender = courseBookingList.map((courseBooking, index) => {
            return <div className="container d-flex justify-content-center mt-4 mb-3" key={index}>
                <div>
                    <Media >
                        <Media body>
                            <Media heading>
                                ID: &nbsp; {courseBooking.id}
                                &nbsp;&nbsp;&nbsp;
                                {courseBooking.currentStatus === "pending" ? <button
                                    onClick={(e) => ArchiveCourseBooking(e, courseBooking.id)}
                                    className="btn btn-primary">
                                    Archive
                                </button> : <button
                                    onClick={(e) => RecoverCourseBooking(e, courseBooking.id)}
                                    className="btn btn-success">
                                    Recover
                                </button>}
                                &nbsp;&nbsp;&nbsp;
                            </Media>
                            Email: {courseBooking.email}
                            <br />
                            CourseName: {courseBooking.courseName}
                            <br />
                            BookingTime: {courseBooking.bookingTime}
                        </Media>
                    </Media>
                </div>
            </div>
        });
    };


    let gigsArchivingToRender;
    if (gigBookingList) {
        gigsArchivingToRender = gigBookingList.map((gigBooking, index) => {
            return <div className="container d-flex justify-content-center mt-4 mb-3" key={index}>
                <div>
                    <Media >
                        <Media body>
                            <Media heading>
                                ID: &nbsp; {gigBooking.id}
                                &nbsp;&nbsp;&nbsp;
                                {gigBooking.currentStatus === "pending" ? <button
                                    onClick={(e) => ArchiveGigBooking(e, gigBooking.id)}
                                    className="btn btn-primary">
                                    Archive
                                </button> : <button
                                    onClick={(e) => RecoverGigBooking(e, gigBooking.id)}
                                    className="btn btn-success">
                                    Recover
                                </button>}
                                &nbsp;&nbsp;&nbsp;
                            </Media>
                            Email: {gigBooking.email}
                            <br />
                            GigName: {gigBooking.gigName}
                            <br />
                            BookingTime: {gigBooking.bookingTime}
                        </Media>
                    </Media>
                </div>
            </div>
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


    const handleShowBookingLessons = () => {
        if (!showCourseBookingResults)
            setShowCourseBookingResults(true);
        else
            setShowCourseBookingResults(false);
    };

    const handleShowBookingGigs = () => {
        if (!showGigBookingResults)
            setShowGigBookingResults(true);
        else
            setShowGigBookingResults(false);
    };

    const handleShowArchivingLessons = () => {
        if (!showArchivingLessons)
            setShowArchivingLessons(true);
        else
            setShowArchivingLessons(false);
    };

    const handleShowArchivingGigs = () => {
        if (!showArchivingGigs)
            setShowArchivingGigs(true);
        else
            setShowArchivingGigs(false);
    };


    const handleDeleteCourseBooking = async (e, email, courseName) => {
        const result = await Confirm('Are you sure to remove this course booking ?',
            'Warning');
        if (result) {
            await axios.post("http://localhost:3001/courseBookingDeletion", {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: {
                    email: email,
                    courseName: courseName,
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
    };


    const handleDeleteGigBooking = async (e, email, gigName) => {
        const result = await Confirm('Are you sure to remove this gig booking ?',
            'Warning');
        if (result) {
            await axios.post("http://localhost:3001/gigBookingDeletion", {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: {
                    email: email,
                    gigName: gigName,
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
                            <h2 className="fw-bold h4 mb-0 text-uppercase">Booking</h2>
                        </div>
                        <div className="col">
                            <hr className="border-secondary mb-0 mt-0" />
                        </div>
                    </div>
                </div>
                <section>
                    <div className="container">
                        <div className="row row-cols-lg-2">
                            <div className="abc pb-4 pt-4" style={{ background: `url(${img1}) no-repeat center/100%` }}>
                                <button className="btn btn-outline-light col-3" onClick={handleShowBookingLessons}>Lesson</button>
                            </div>
                            <div className="abc pb-4 pt-4" style={{ background: `url(${img4}) no-repeat center/100%` }}>
                                <button className="btn btn-outline-light col-3" onClick={handleShowBookingGigs}>Gig</button>
                            </div>
                        </div>
                    </div>
                </section>


                <div className="container mt-5">
                    <div id="manyPicture" className="container">
                        {showCourseBookingResults ? coursesBookingToRender : null}
                    </div>
                </div>

                <div className="container mt-5">
                    <div id="manyPicture" className="container">
                        {showGigBookingResults ? gigsBookingToRender : null}
                    </div>
                </div>

                <div className="container pb-4 pt-4">
                    <div className="align-items-center row">
                        <div className="col">
                            <hr className="border-secondary mb-0 mt-0" />
                        </div>
                        <div className="col-auto">
                            <h2 className="fw-bold h4 mb-0 text-uppercase">Archiving</h2>
                        </div>
                        <div className="col">
                            <hr className="border-secondary mb-0 mt-0" />
                        </div>
                    </div>
                </div>

                <section>
                    <div className="container">
                        <div className="row row-cols-lg-2">
                            <div className="abc pb-4 pt-4" style={{ background: `url(${img5}) no-repeat center/100%` }}>
                                <button className="btn btn-outline-light col-3" onClick={handleShowArchivingLessons}>Lesson</button>
                            </div>
                            <div className="abc pb-4 pt-4" style={{ background: `url(${img3}) no-repeat center/100%` }}>
                                <button className="btn btn-outline-light col-3" onClick={handleShowArchivingGigs}>Gig</button>
                            </div>
                        </div>
                    </div>
                </section>


                <div className="container mt-5">
                    <div id="manyPicture" className="container">
                        {showArchivingLessons ? coursesArchivingToRender : null}
                    </div>
                </div>

                <div className="container mt-5">
                    <div id="manyPicture" className="container">
                        {showArchivingGigs ? gigsArchivingToRender : null}
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
                    </div>
                </div>
            </main>
        </div>
    );
}