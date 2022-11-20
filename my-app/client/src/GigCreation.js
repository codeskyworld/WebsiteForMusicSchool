import React, { Fragment, useState} from "react";
import "./App.css";
import "./royi_style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormText, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios'
import Message from './components/Message';
import Progress from './components/Progress';
import {VscSymbolNamespace} from 'react-icons/vsc';
import {MdStyle,MdDateRange,MdDescription,MdAccessTime} from 'react-icons/md';
import {IoIosPricetags} from 'react-icons/io';
import {CgCalendarDates} from 'react-icons/cg';
import {GiPositionMarker} from 'react-icons/gi';


export default function GigCreation() {

    const [isCreate, setIsCreate] = useState(false);

    const [gigName, setGigName] = useState("");
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


    const addGig = async () => {
        await axios.post("http://localhost:3001/gigCreation", {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            data: {
                gigName: gigName,
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
            .then((res) => {
                if (res.data.success) {
                    alert(" Gig Creation succeed!");
                    setIsCreate(true);
                }
            })
            .catch((error) => alert("There is a mistake that." + error));
    };

    const CreateGigHandler = (e) => {
        e.preventDefault();
        if (!gigName || !style || !price || !description
            || !place || !startTime || !endTime || !dateList || !oneForOne || oneForOne === "----Select----" || !picturePath) {
            // console.log("gigName is " + gigName);
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
            addGig();
        }
    };

    if (isCreate) {
        return < Redirect to="/bookingGigs" />;
    }
    return (
        <div id="gigCreationWindow" className="container justify-content-center mt-3">
            <div className="text-center">
                <h1 className="registerTitle">Gig Creation</h1>
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

            <Form className="w-100 section style__grid" >
                <div className="gigcreation__inputss style__grid">
                    <FormGroup className="gigcreation__content">
                        <VscSymbolNamespace className="gigcreation__icon"/>
                        <Label for="name" className="gigcreation__label"  sm={5}>
                                Name
                        </Label>
                        <Col sm={12}>
                                <input
                                    type="text"
                                    name="gigName"
                                    id="gigName"
                                    className="gigcreation__input"
                                    placeholder="  Name"
                                    onChange={(event) => { setGigName(event.target.value) }}
                                />
                               
                        </Col>
                    </FormGroup>
                    
                    <FormGroup className="gigcreation__content">
                    <MdStyle className="gigcreation__icon"/>
                        <Label for="style" className="gigcreation__label"  sm={5}>
                            Style
                        </Label>
                        <Col sm={12}>
                            <input
                                type="text"
                                name="style"
                                id="style"
                                placeholder=" Style"
                                className="gigcreation__input"
                                onChange={(event) => { setStyle(event.target.value) }}
                            />
                        </Col>
                    </FormGroup>
                    
                    <FormGroup className="gigcreation__content">
                        <IoIosPricetags className="gigcreation__icon"/>
                        <Label for="price" className="gigcreation__label" sm={5}>
                            Price
                        </Label>
                        <Col sm={12}>
                            <input
                                type="text"
                                name="price"
                                id="price"
                                className="gigcreation__input"
                                placeholder=" Price"
                                onChange={(event) => { setPrice(event.target.value) }}
                            />
                        </Col>
                    </FormGroup>
                </div>
                    <Col sm={12}>
                    </Col>

                <div className="gigcreation__inputs style__grid">
                    <FormGroup className="gigcreation__content">
                        <MdDateRange className="gigcreation__icon"/>
                        <Label for="startTime" className="gigcreation__label" sm={5}>
                            Start Time
                        </Label>
                        <Col sm={12}>
                            <input
                                type="text"
                                name="startTime"
                                id="startTime"
                                className="gigcreation__input"
                                placeholder=" Start Time"
                                onChange={(event) => { setStartTime(event.target.value) }}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup className="gigcreation__content">
                        <CgCalendarDates className="gigcreation__icon"/>
                        <Label for="endTime" className="gigcreation__label" sm={5}>
                            End Time
                        </Label>
                        <Col sm={12}>
                            <input
                                type="text"
                                name="endTime"
                                id="endTime"
                                className="gigcreation__input"
                                placeholder=" End Time"
                                onChange={(event) => { setEndTime(event.target.value) }}
                            />
                        </Col>
                    </FormGroup>
                </div>
                <FormGroup className="gigcreation__content">
                    <GiPositionMarker className="gigcreation__icon"/>
                    <Label for="place" className="gigcreation__label" sm={5}>
                        Teaching Place
                    </Label>
                    <Col sm={12}>
                        <input
                            type="text"
                            name="place"
                            id="place"
                            className="gigcreation__input"
                            placeholder=" Teaching Place"
                            onChange={(event) => { setPlace(event.target.value) }}
                        />
                    </Col>
                </FormGroup>

              

                <FormGroup className="gigcreation__content">
                    <MdAccessTime className="gigcreation__icon"/>
                    <Label for="dateList" className="gigcreation__label" sm={5}>
                        Teaching Date
                    </Label>
                    <Col sm={12}>
                        <input
                            type="text"
                            name="dateList"
                            id="dateList"
                            className="gigcreation__input"
                            placeholder=" Teaching Date"
                            onChange={(event) => { setDateList(event.target.value) }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup className="gigcreation__content">
                    <MdDescription className="gigcreation__icon"/>
                    <Label for="description" className="gigcreation__label" sm={5}>Description</Label>
                    <textarea  
                        name="description" 
                        id="description"
                        className="contact__input"
                        placeholder="   Describe Gigs"
                        onChange={(event) => { setDescription(event.target.value) }} />
                </FormGroup>
                <FormGroup className="gigcreation__content">
                    <Label for="oneForOne" className="gigcreation__label" sm={5}>OneForOne</Label>
                    <Col>
                    <select  name="OneForOne" id="OneForOne" className="gigcreation__input" placeholder="123-45-678"
                        onChange={(event) => { setOneForOne(event.target.value) }}>
                        <option>----Select----</option>
                        <option>True</option>
                        <option>False</option>

                    </select>
                    </Col>
                </FormGroup>

                <div className="d-grid gap-3 mt-5">
                    <div className="gigcreation__button">
                    <div
                        onClick={CreateGigHandler}>Create</div>
                        <div className="dot"></div>
                    </div>
                </div>

            </Form>

        </div>
    );
}