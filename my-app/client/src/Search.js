import React, { useState, useEffect } from "react";
import "./App.css";
import "./royi_style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { useParams, BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


export default function Search() {
    const { query } = useParams();
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        async function searchForQuery() {
            await axios.post("http://localhost:3001/search", {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: {
                    query: query,
                }
            })
                .then((response) => {
                    console.log("response.data is " + response.data);
                    if (response.data.length === 0) {
                        setCourseList(false);
                    }
                    else {
                        setCourseList(response.data);
                    }
                })
                .catch((error) => alert("There is a mistake that." + error));
        };
        searchForQuery();
    }, [query]);

    let coursesToRender;
    if (courseList) {
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
        coursesToRender = <h4>Sorry, the search result is empty!</h4>;
    }

    if (courseList)
        return (
            <div className="container mt-5">
                <div id="manyPicture" className="container justify-content-center">
                    {coursesToRender}
                </div>
            </div>
        );

    else {
        return (
            <div className="container justify-content-center mt-5 mb-5">        
                    <h4 id="emptySearch">Sorry, we can't find the result that match your search !</h4>
            </div>
        );
    }
}