import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios'
//   import LinearGradient from 'react-native-linear-gradient';
import "./App.css";
import "./Raine.css";
import "bootstrap/dist/css/bootstrap.min.css";
import img5 from "./img/Raine/img2.png"
import img6 from "./img/Raine/img3.png"
import img7 from "./img/Raine/img4.jfif"
import img8 from "./img/Raine/img5.jfif"
import img9 from "./img/Raine/img6.jfif"
import img0 from "./img/Raine/img7.webp"


export default function GuitarLessons() {
    const [courseList, setCourseList] = useState([]);
    const getCourse = async () => {
        await axios.get("http://localhost:3001/courses").then((response) => {
            setCourseList(response.data)
        });
    };

    useEffect(() => {
        getCourse();
    }, []);

    let coursesToRender;

    coursesToRender = courseList.map((course, index) => {
        return <section className="rgba d-md-flex flex-md-equal my-md-3 ps-md-3" key={index}>
            <div className="me-md-3 overflow-hidden pt-3 pt-md-5 px-3 px-md-5 text-center text-white">
                <h2 className="display-5 text-black-50 text-end" style={{ backgroundColor: "#076685a8", marginLeft: "65%" }}>{course.courseName}</h2>
                <div className="mb-3 mt-0 my-3 py-3 text-start h-200" style={{ float: "right", width: "65%" }}>
                    <div className="abc pb-5 pt-5 h-150" style={{ width: "100%", float: "left", height: "250px", background: `url(${course.picturePath}) no-repeat center/100% 100%` }}>
                    </div>
                    <p>{course.description}
                    </p>
                </div>
                <div className="mx-auto shadow-sm text-black" style={{ float: "left", width: "35%" }}>
                    <p className="text-start">Teaching Place: {course.place}<br />
                        Style: {course.style}<br />
                        Start Time: {course.startTime}<br />
                        End Time: {course.endTime}<br />
                        Date: {course.dateList} <br />
                        Price: {course.price}
                    </p>
                </div>
            </div>
        </section>


    });

    return (
        <div id="guitarLessons" className="bck">
            {coursesToRender}
            <section className="pb-5 pt-5 text-center" style={{ backgroundColor: "rgba(255,255,255,0.9)" }}>
                <div className="container pb-4 pt-4">
                    <div className="row">
                        <div className="col-lg-8 ms-auto me-auto py-3">
                            <h2 className="text-dark">Book a free introductory Lesson? <a href="/Register" >Sign up </a></h2>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container-fluid p-0">
                <div className="g-0 row">
                    <img src={img5} className="col-2 img-fluid" alt="Instagram" width="400" height="400" />
                    <img src={img6} className="col-2 img-fluid" alt="Instagram" width="400" height="400" />
                    <img src={img7} className="col-2 img-fluid" alt="Instagram" width="400" height="400" />
                    <img src={img8} className="col-2 img-fluid" alt="Instagram" width="400" height="400" />
                    <img src={img9} className="col-2 img-fluid" alt="Instagram" width="400" height="400" />
                    <img src={img0} className="col-2 img-fluid" alt="Instagram" width="400" height="400" />
                </div>
            </div>
        </div>
    );
}