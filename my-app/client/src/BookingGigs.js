import React, { useState, useEffect} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Confirm } from 'react-st-modal';

const BookingGigs = () => {

    const [isDelete, setIsDelete] = useState(false);

    const [loggedAsStudent, setLoggedAsStudent] = useState(false);
    const [loggedAsTeacher, setLoggedAsTeacher] = useState(false);
    const [loggedAsAdministrator, setLoggedAsAdministrator] = useState(false);

    const [gigList, setGigList] = useState([]);

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


    const getGig = () => {
        axios.get("http://localhost:3001/gigs").then((response) => {
            setGigList(response.data)
        });
    };

    useEffect(() => {
        getGig();
    }, []);


    const handleDeleteGig = async (e, gigName) => {
        e.preventDefault();
        const result = await Confirm('Are you sure to remove this gig?',
            'Warning');

        if (result) {
            await axios.post("http://localhost:3001/gigDeletion", {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: {
                    gigName: gigName,
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


    const handleBookingGig = async (e, gigName) => {
        e.preventDefault();
        let emailStorage = localStorage.getItem("email");
        if (!emailStorage) {
            alert("emailStorage is empty!!!");
            return;
        }
        var current = new Date();
        var currentTime = current.toLocaleString();
        const result = await Confirm('Are you sure to book this gig?',
            'Notice');

        if (result) {
            await axios.post("http://localhost:3001/gigBooking", {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: {
                    email: emailStorage,
                    gigName: gigName,
                    bookingTime: currentTime,
                    paymentStatus: "pending",
                    currentStatus: "pending",
                }
            }).then((res) => {
                if (res.data.success) {
                    return;
                }
            }).catch((error) => {
                alert("Sorry, You have booked this gig!");
                console.log("Gig booking error is " + error)
            });
        } else {
            return;
        }
    };


    let gigsToRender;

    if (gigList && loggedAsTeacher) {
        gigsToRender = gigList.map((gig, index) => {
            return <div className="col text-center" key={index}>
                <img id="allfiles" src={`${gig.picturePath}`} />
                <p>{gig.gigName}</p>
                <div className="d-flex justify-content-center gap-3 mt-3 mb-3 ">
                    <div>
                        <Link to={
                            `/GigDetail/${gig.gigName}`} className="btn btn-primary">Detail</Link>
                    </div>
                    <div>
                        <Link to={
                            `/GigEdit/${gig.gigName}`} className="btn btn-success">Edit</Link>
                    </div>
                    <div>
                        <button
                            onClick={(e) => handleDeleteGig(e, gig.gigName)}
                            className="btn btn-danger">
                            Delete
                        </button>
                    </div>
                </div>
            </div>;
        });
    }

    else if (gigList && loggedAsStudent) {
        gigsToRender = gigList.map((gig, index) => {
            return <div className="col text-center" key={index}>
                <img id="allfiles" src={`${gig.picturePath}`} />
                <p>{gig.gigName}</p>
                <div className="d-flex justify-content-center gap-3 mt-3 mb-3 ">
                    <div>
                        <Link to={
                            `/GigDetail/${gig.gigName}`} className="btn btn-primary">Detail</Link>
                    </div>
                    <div>
                        <button
                            onClick={(e) => handleBookingGig(e, gig.gigName)}
                            className="btn btn-secondary">
                            Booking
                        </button>
                    </div>
                </div>
            </div>;
        });
    }

    else if (gigList && loggedAsAdministrator) {
        gigsToRender = gigList.map((gig, index) => {
            return <div className="col text-center" key={index}>
                <img id="allfiles" src={`${gig.picturePath}`} />
                <p>{gig.gigName}</p>
                <div className="d-flex justify-content-center gap-3 mt-3 mb-3 ">
                    <div>
                        <Link to={
                            `/GigDetail/${gig.gigName}`} className="btn btn-primary">Detail</Link>
                    </div>
                    <div>
                        <Link to={
                            `/GigEdit/${gig.gigName}`} className="btn btn-success">Edit</Link>
                    </div>
                    <div>
                        <button
                            onClick={(e) => handleBookingGig(e, gig.gigName)}
                            className="btn btn-secondary">
                            Booking
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={(e) => handleDeleteGig(e, gig.gigName)}
                            className="btn btn-danger">
                            Delete
                        </button>
                    </div>
                </div>
            </div>;
        });
    }

    else if (gigList && !loggedAsTeacher && !loggedAsStudent && !loggedAsAdministrator) {
        gigsToRender = gigList.map((gig, index) => {
            return <div className="col text-center" key={index}>
                <img id="allfiles" src={`${gig.picturePath}`} />
                <p>{gig.gigName}</p>
                <div className="d-flex justify-content-center gap-3 mt-3 mb-3 ">
                    <div>
                        <Link to={
                            `/GigDetail/${gig.gigName}`} className="btn btn-primary">Detail</Link>
                    </div>
                    <div>
                        <Link to="/login" className="btn btn-secondary">Booking</Link>
                    </div>
                </div>
            </div>;
        });
    }

    else {

        gigsToRender = "Loading...";
    }


    if (isDelete) {
        window.location.reload();
    }
    return (
        <div className="container mt-5">
            <div id="manyPicture" className="container">
                {gigsToRender}
            </div>
        </div>
    )
}

export default BookingGigs
