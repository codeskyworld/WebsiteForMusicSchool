import React, { useState, useEffect } from "react";
import "./App.css";
import "./royi_style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import { useParams, BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { FormText, Form, FormGroup, Label, Input, Col } from "reactstrap";
import {VscSymbolNamespace} from 'react-icons/vsc';
import {MdStyle,MdDateRange,MdDescription,MdAccessTime} from 'react-icons/md';
import {IoIosPricetags} from 'react-icons/io';
import {CgCalendarDates} from 'react-icons/cg';
import {GiPositionMarker} from 'react-icons/gi';
export default function CourseDetail() {

    const [courseName, setCourseName] = useState("");
    const [style, setStyle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [place, setPlace] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [dateList, setDateList] = useState("");
    const [oneForOne, setOneForOne] = useState("");
    const [picturePath, setPicturePath] = useState("");


    const { course } = useParams();
    useEffect(() => {
        async function getCourseDetail() {
            await axios.post("http://localhost:3001/courseDetail", {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: {
                    courseName: course,
                }
            }).then((res) => {
                setCourseName(res.data[0].courseName);
                setStyle(res.data[0].style);
                setPrice(res.data[0].price);
                setDescription(res.data[0].description);
                setPlace(res.data[0].place);
                setStartTime(res.data[0].startTime);
                setEndTime(res.data[0].endTime);
                setDateList(res.data[0].dateList);
                setOneForOne(res.data[0].oneForOne);
                setPicturePath(res.data[0].picturePath);
            }).catch((error) => alert("error is " + error));
        }
        getCourseDetail();
    }, []);

    return (
        <div id="courseCreationWindow" className="container justify-content-center mt-3">
            <div className="text-center">
                <h1 className="registerTitle">{courseName}</h1>
            </div>

            <Form className="w-100">
                
                <FormGroup className="details__section d-flex">
                <MdStyle className="gigcreation__icon"/>
                    <Label for="gigName" className="details__label w-25"sm={5}>
                        Style
                    </Label>
                    <div className="details__information">
                        {style}
                    </div>
                </FormGroup>

                <FormGroup className="details__section d-flex">
                <IoIosPricetags className="gigcreation__icon"/>
                    <Label for="gigName" className="details__label w-25"sm={5}>
                        Price
                    </Label>
                    <div className="details__information">
                        {price}
                    </div>
                </FormGroup>
                <FormGroup className="details__section d-flex">
                <MdDescription className="gigcreation__icon"/>
                    <Label for="gigName" className="details__label w-25"sm={5}>
                    Description 
                    </Label>
                    <div className="details__information">
                        {description}
                    </div>
                </FormGroup><FormGroup className="details__section d-flex">
                <MdDateRange className="gigcreation__icon"/>
                    <Label for="gigName" className="details__label w-25"sm={5}>
                    startTime
                    </Label>
                    <div className="details__information">
                        {startTime}
                    </div>
                </FormGroup><FormGroup className="details__section d-flex">
                <CgCalendarDates className="gigcreation__icon"/>
                    <Label for="gigName" className="details__label w-25"sm={5}>
                    endTime 
                    </Label>
                    <div className="details__information">
                        {endTime}
                    </div>
                </FormGroup><FormGroup className="details__section d-flex">
                <MdAccessTime className="gigcreation__icon"/>
                    <Label for="gigName" className="details__label w-25"sm={5}>
                        Teaching Date
                    </Label>
                    <div className="details__information">
                        {dateList}
                    </div>
                </FormGroup><FormGroup className="details__section d-flex">
                <GiPositionMarker className="gigcreation__icon"/>
                    <Label for="gigName" className="details__label w-25"sm={5}>
                        Teaching Place
                    </Label>
                    <div className="details__information">
                        {place}
                    </div>
                </FormGroup><FormGroup className="details__section d-flex">
                    
                    <Label for="gigName" className="details__label w-25"sm={5}>
                        One for One
                    </Label>
                    <div className="details__information">
                        {oneForOne}
                    </div>
                </FormGroup>

                <FormGroup>
                    <img id="allfiles" src={`${picturePath}`} />
                </FormGroup>

            </Form>
        </div>
    );
}