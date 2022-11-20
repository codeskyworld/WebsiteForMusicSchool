import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import { useParams, BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { FormText, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { Redirect } from "react-router-dom";

import Message from './components/Message';
import Progress from './components/Progress';


export default function CourseEdit() {

    const [isUpdate, setIsUpdate] = useState(false);

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


    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

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

    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('http://localhost:3001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) /
                        progressEvent.total)));
                    setTimeout(() => setUploadPercentage(0), 10000);
                }
            });

            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath });
            setPicturePath(filePath);
            console.log("filePath is " + filePath);
            console.log("picturePath is " + picturePath);
            console.log("uploadedFile is " + uploadedFile);
            setMessage("File Uploaded");
        } catch (err) {
            if (err.response.status === 500) {
                setMessage("There was a problem with the server");
            } else {
                setMessage("err is " + err.response.data);
            }
        }
    }


    const editCourse = async () => {

        try {
            const res = await axios.post("http://localhost:3001/courseEdition", {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: {
                    courseName: courseName,
                    style: style,
                    price: price,
                    description: description,
                    place: place,
                    startTime: startTime,
                    endTime: endTime,
                    dateList: dateList,
                    oneForOne: oneForOne,
                    picturePath: picturePath,
                }
            })

            if (res.data.success) {
                alert(" Course update succeed!");
                setIsUpdate(true);
            }

        }
        catch (error) { alert("There is a mistake that." + error) };
    };

    const EditCourseHandler = (e) => {
        e.preventDefault();

        if (!courseName || !style || !price || !description
            || !place || !startTime || !endTime || !dateList || !oneForOne || oneForOne === "----Select----" || !picturePath) {
            // console.log("courseName is " + courseName);
            // console.log("style is " + style);
            // console.log("price is " + price);
            // console.log("description is " + description);
            // console.log("place is " + place);
            // console.log("startTime is " + startTime);
            // console.log("endTime is " + endTime);
            // console.log("dateList is " + dateList);
            // console.log("oneForOne is " + oneForOne);
            // console.log("picturePath is " + picturePath);
            alert("Please enter all information!");
        }
        else {
            editCourse();
            console.log("editCourse has been executed!");
        }
    };

    if (isUpdate) {
        return < Redirect to="/bookingCourses" />;
    }

    return (
        <div id="courseCreationWindow" className="container justify-content-center mt-3">
            <div className="text-center">
                <h1 id="registerTitle">Course Edit</h1>
            </div>
            <div>
                <Fragment>
                    {message ? <Message msg={message} /> : null}
                    <form onSubmit={onSubmit}>
                        <div className='custom-file mb-4'>
                            <input
                                type='file'
                                className='custom-file-input'
                                id='customFile'
                                onChange={onChange}
                            />
                            <label className='custom-file-label' htmlFor='customFile'>
                                {filename}
                            </label>
                        </div>

                        <Progress percentage={uploadPercentage} />

                        <input
                            type="submit"
                            value="Upload"
                            className="btn btn-primary btn-block mt-4"
                        />
                    </form>
                </Fragment>
            </div>

            <Form className="w-100">

                <FormGroup>
                    <Label for="courseName" sm={5}>
                        CourseName
                    </Label>
                    <Col sm={12}>
                        <Input
                            type="text"
                            name="courseName"
                            id="courseName"
                            placeholder={courseName}
                            readOnly="readOnly"
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Label for="style" sm={5}>
                        Style
                    </Label>
                    <Col sm={12}>
                        <Input
                            type="text"
                            name="style"
                            id="style"
                            placeholder={style}
                            onChange={(event) => { setStyle(event.target.value) }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Label for="price" sm={5}>
                        Price
                    </Label>
                    <Col sm={12}>
                        <Input
                            type="text"
                            name="price"
                            id="price"
                            placeholder={price}
                            onChange={(event) => { setPrice(event.target.value) }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="textarea" name="description" id="description" placeholder={description}
                        onChange={(event) => { setDescription(event.target.value) }} />
                </FormGroup>

                <FormGroup>
                    <Label for="place" sm={5}>
                        TeachingPlace
                    </Label>
                    <Col sm={12}>
                        <Input
                            type="text"
                            name="place"
                            id="place"
                            placeholder={place}
                            onChange={(event) => { setPlace(event.target.value) }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Label for="startTime" sm={5}>
                        StartTime
                    </Label>
                    <Col sm={12}>
                        <Input
                            type="text"
                            name="startTime"
                            id="startTime"
                            placeholder={startTime}
                            onChange={(event) => { setStartTime(event.target.value) }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Label for="endTime" sm={5}>
                        EndTime
                    </Label>
                    <Col sm={12}>
                        <Input
                            type="text"
                            name="endTime"
                            id="endTime"
                            placeholder={endTime}
                            onChange={(event) => { setEndTime(event.target.value) }}
                        />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Label for="dateList" sm={5}>
                        TeachingDate
                    </Label>
                    <Col sm={12}>
                        <Input
                            type="text"
                            name="dateList"
                            id="dateList"
                            placeholder={dateList}
                            onChange={(event) => { setDateList(event.target.value) }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Label for="oneForOne" sm={5}>OneForOne</Label>
                    <Input type="select" name="OneForOne" id="OneForOne" placeholder="123-45-678"
                        onChange={(event) => { setOneForOne(event.target.value) }}>
                        <option>----Select----</option>
                        <option>True</option>
                        <option>False</option>

                    </Input>
                </FormGroup>

                <div className="d-grid gap-3 mt-5">
                    <button className="btn btn-outline-primary btn-lg w-100"
                        onClick={EditCourseHandler}>Save</button>
                    <Link to="/bookingCourses" className="btn btn-outline-danger btn-lg">Back</Link>
                </div>

            </Form>

        </div>
    );
}



