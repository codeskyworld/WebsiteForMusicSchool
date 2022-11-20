import React, { useState, useEffect } from "react";
import axios from 'axios'
//   import LinearGradient from 'react-native-linear-gradient';
import "./App.css";
import "./Raine.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import img4 from "./img/Raine/img2.png"
import img5 from "./img/Raine/img3.png"
import img6 from "./img/Raine/img4.jfif"
import img7 from "./img/Raine/img5.jfif"
import img8 from "./img/Raine/img6.jfif"
import img9 from "./img/Raine/img7.webp"

export default function Gigs() {
    const [gigList, setGigList] = useState([]);
    const getGig = async () => {
        await axios.get("http://localhost:3001/gigs").then((response) => {
            setGigList(response.data)
        });
    };

    useEffect(() => {
        getGig();
    }, []);

    let gigsToRender;

    gigsToRender = gigList.map((gig, index) => {
        return <section className="pb-5 pt-5" key={index}>
            <div className="container pb-5 pt-5">
                <div className="align-items-center g-4 row">
                    <div className="col-lg-5 me-auto ms-auto pt-lg-5">
                        <div className="card">
                            <img src={gig.picturePath} className="img-fluid" alt="Blog" />
                            <div className="card-body">
                                <h2 className="card-title h5">{gig.gigName}</h2>
                                <p className="card-text">{gig.description}</p>
                            </div>
                            <div className="align-items-center card-footer d-inline-flex justify-content-between small">
                                <div>
                                    <h3 className="card-title h5">Style: {gig.style}</h3>
                                    <p>OneForOne: {gig.oneForOne}</p>
                                </div>
                                <span><a href="/bookingGigs"><button type="button" className="btn btn-secondary col-12 float-end">Book</button></a></span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 mt-lg-n4 ps-lg-4 text-center">
                        <h3 className="h1 text-dark">Gig's Info</h3>
                        <ul>
                            <li className="mb-0 text-secondary">Location: {gig.place}</li>
                            <li className="mb-0 text-secondary">Price: {gig.price}</li>
                            <li className="mb-0 text-secondary">Start Time: {gig.startTime}</li>
                            <li className="mb-0 text-secondary">End Time: {gig.endTime}</li>
                            <li className="mb-0 text-secondary">Date: {gig.dateList}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    });

    return (
        <div id="gigs">
            {gigsToRender}
            <div className="container pb-4 pt-4">
                <div className="align-items-center row">
                    <div className="col">
                        <hr className="border-secondary mb-0 mt-0" />
                    </div>
                    <div className="col-auto">
                        <h2 className="fw-bold h4 mb-0 text-uppercase">Students' Comments</h2>
                    </div>
                    <div className="col">
                        <hr className="border-secondary mb-0 mt-0" />
                    </div>
                </div>
            </div>
            <section className="bg-light mb-4 mt-4 pb-5 pt-5 text-center">
                <div className="container pb-3 position-relative pt-3">
                    <div className="row">
                        <div className="col-lg-5 ms-auto me-auto">
                            <div id="carousel5" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src="https://images.unsplash.com/photo-1517101724602-c257fe568157?ixid=MXwyMDkyMnwwfDF8c2VhcmNofDZ8fHBhcnJvdHxlbnwwfHx8&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=360&h=360&fit=crop" className="img-fluid mb-3 rounded-circle testimonial_img" width="60" height="60" alt="User" />
                                        <p className="mb-4">Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.</p>
                                        <h2 className="fw-bold h5 mb-0 text-dark">Kathryn Murphy</h2>
                                        <p className="small">10 August 2020</p>
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixid=MXwyMDkyMnwwfDF8c2VhcmNofDE5fHxkb2d8ZW58MHx8fA&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=360&h=360&fit=crop" className="img-fluid mb-3 rounded-circle testimonial_img" width="60" height="60" alt="User" />
                                        <p className="mb-4">Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.</p>
                                        <h2 className="fw-bold h5 mb-0 text-dark">Dianne Russell</h2>
                                        <p className="small">10 August 2020</p>
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://images.unsplash.com/photo-1574158622682-e40e69881006?ixid=MXwyMDkyMnwwfDF8c2VhcmNofDd8fGNhdHxlbnwwfHx8&ixlib=rb-1.2.1q=85&fm=jpg&crop=faces&cs=srgb&w=360&h=360&fit=crop" className="img-fluid mb-3 rounded-circle testimonial_img" width="60" height="60" alt="User" />
                                        <p className="mb-4">Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.</p>
                                        <h2 className="fw-bold h5 mb-0 text-dark">Darrell Steward</h2>
                                        <p className="small">10 August 2020</p>
                                    </div>
                                </div>
                                <ol className="carousel-indicators position-relative">
                                    <li data-bs-target="#carousel5" data-bs-slide-to="0" className="active bg-dark"></li>
                                    <li data-bs-target="#carousel5" data-bs-slide-to="1" className="bg-dark"></li>
                                    <li data-bs-target="#carousel5" data-bs-slide-to="2" className="bg-dark"></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pb-5 pt-5 text-center">
                <div className="container pb-4 pt-4">
                    <div className="row">
                        <div className="col-lg-8 ms-auto me-auto py-3">
                            <h2 className="text-dark">Feel Interested? <a href="/" >Book a gig! </a></h2>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container-fluid p-0">
                <div className="g-0 row">
                    <img src={img4} className="col-2 img-fluid" alt="Instagram" width="400" height="400" />
                    <img src={img5} className="col-2 img-fluid" alt="Instagram" width="400" height="400" />
                    <img src={img6} className="col-2 img-fluid" alt="Instagram" width="400" height="400" />
                    <img src={img7} className="col-2 img-fluid" alt="Instagram" width="400" height="400" />
                    <img src={img8} className="col-2 img-fluid" alt="Instagram" width="400" height="400" />
                    <img src={img9} className="col-2 img-fluid" alt="Instagram" width="400" height="400" />
                </div>
            </div>
        </div>
    );
}