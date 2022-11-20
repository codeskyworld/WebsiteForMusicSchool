import React, { useState, useEffect} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Confirm } from 'react-st-modal';


const BookingCourses = () => {
    const [isDelete, setIsDelete] = useState(false);

    const [loggedAsStudent, setLoggedAsStudent] = useState(false);
    const [loggedAsTeacher, setLoggedAsTeacher] = useState(false);
    const [loggedAsAdministrator, setLoggedAsAdministrator] = useState(false);
    const [courseList, setCourseList] = useState([]);


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


    const getCourse = async () => {
        await axios.get("http://localhost:3001/courses").then((response) => {
            setCourseList(response.data)
        });
    };

    useEffect(() => {
        getCourse();
    }, []);

    const handleDeleteCourse = async (e, courseName) => {
        e.preventDefault();
        const result = await Confirm('Are you sure to remove this course?',
            'Warning');

        if (result) {
            await axios.post("http://localhost:3001/courseDeletion", {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: {
                    courseName: courseName,
                }
            }).then((res) => {
                if (res.data.success) {
                    setIsDelete(true);
                }
            }).catch((error) => alert("error is " + error));
        } else {
            return;
        }
    }


    const handleBookingCourse = async (e, courseName) => {
        e.preventDefault();
        let emailStorage = localStorage.getItem("email");
        if (!emailStorage) {
            alert("emailStorage is empty!!!");
            return;
        }
        var current = new Date();
        var currentTime = current.toLocaleString();
        const result = await Confirm('Are you sure to book this course?',
            'Notice');

        if (result) {
            await axios.post("http://localhost:3001/courseBooking", {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: {
                    email: emailStorage,
                    courseName: courseName,
                    bookingTime: currentTime,
                    paymentStatus: "pending",
                    currentStatus: "pending",
                }
            }).then((res) => {
                if (res.data.success) {
                    return;
                }
            }).catch((error) => {
                alert("Sorry, You have booked this course!");
                console.log("Course booking error is " + error)
            });
        } else {
            return;
        }
    };

    let coursesToRender;

    if (courseList && loggedAsTeacher) {
        coursesToRender = courseList.map((course, index) => {
            return <div className="col text-center" key={index}>
                <img id="allfiles" src={`${course.picturePath}`} />
                <p>{course.courseName}</p>
                <div className="d-flex justify-content-center gap-3 mt-3 mb-3 ">
                    <div>
                        <Link to={
                            `/courseDetail/${course.courseName}`} className="btn btn-primary">Detail</Link></div>
                    <div>
                        <Link to={
                            `/courseEdit/${course.courseName}`} className="btn btn-success">Edit</Link></div>
                    <div>
                        <button
                            onClick={(e) => handleDeleteCourse(e, course.courseName)}
                            className="btn btn-danger">
                            Delete
                        </button>
                    </div>
                </div>
            </div>;

        });
    }

    else if (courseList && loggedAsStudent) {
        coursesToRender = courseList.map((course, index) => {
            return <div className="col text-center" key={index}>
                <img id="allfiles" src={`${course.picturePath}`} />
                <p>{course.courseName}</p>
                <div className="d-flex justify-content-center gap-3 mt-3 mb-3 ">
                    <div>
                        <Link to={`/courseDetail/${course.courseName}`} className="btn btn-primary">Detail</Link>
                    </div>
                    <div>
                        <button
                            onClick={(e) => handleBookingCourse(e, course.courseName)}
                            className="btn btn-secondary">
                            Booking
                        </button>
                    </div>
                </div>
            </div>;

        });
    }

    else if (courseList && loggedAsAdministrator) {
        coursesToRender = courseList.map((course, index) => {
            return <div className="col text-center" key={index}>
                <img id="allfiles" src={`${course.picturePath}`} />
                <p>{course.courseName}</p>
                <div className="d-flex justify-content-center gap-3 mt-3 mb-3 ">
                    <div>
                        <Link to={
                            `/courseDetail/${course.courseName}`} className="btn btn-primary">Detail</Link></div>
                    <div>
                        <Link to={
                            `/courseEdit/${course.courseName}`} className="btn btn-success">Edit</Link></div>
                    <div>
                        <button
                            onClick={(e) => handleBookingCourse(e, course.courseName)}
                            className="btn btn-secondary">
                            Booking
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={(e) => handleDeleteCourse(e, course.courseName)}
                            className="btn btn-danger">
                            Delete
                        </button>
                    </div>
                </div>
            </div>;

        });
    }


    else if (courseList && !loggedAsTeacher && !loggedAsStudent && !loggedAsAdministrator) {
        coursesToRender = courseList.map((course, index) => {
            return <div className="col text-center" key={index}>
                <img id="allfiles" src={`${course.picturePath}`} />
                <p>{course.courseName}</p>
                <div className="d-flex justify-content-center gap-3 mt-3 mb-3 ">
                    <div>
                        <Link to={
                            `/courseDetail/${course.courseName}`} className="btn btn-primary">Detail</Link>
                    </div>
                    <div>
                        <Link to="/login" className="btn btn-secondary">Booking</Link>
                    </div>
                </div>
            </div>;

        });
    }

    else {

        coursesToRender = "Loading...";
    }




    if (isDelete) {
        window.location.reload();
    }


    return (
        <div className="container mt-5">
            <div id="manyPicture" className="container">
                {coursesToRender}
            </div>
        </div>
    )
}

export default BookingCourses
