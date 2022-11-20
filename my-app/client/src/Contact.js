import React, { useState } from "react";
import "./App.css";
import "./royi_style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdPhone } from "react-icons/md"
import { FaEnvelope, FaMap,FaTelegramPlane } from "react-icons/fa"
import { RiMapPinFill } from "react-icons/ri"


export default function Contact() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [project, setProject] = useState('')
    const [message, setMessage] = useState('')

    return (
        <div>
            <h2 className="section__title">We'd Love to Hear From You</h2>
            <span className="section__subtitle">Get in touch</span>

            <div className="contact__container container style__grid">
            <div>
                <div className="contact__information">
                <MdPhone className="contact__icon"/>

                <div>
                    <h3 className="contact__title">Appellation</h3>
                    <span className="contact__subtitle">Basic information</span>
                </div>
                </div>

                <div className="contact__information">
                <FaEnvelope className="contact__icon"/>

                <div>
                    <h3 className="contact__title">File</h3>
                    <span className="contact__subtitle">Project background</span>
  i              </div>
                </div>

                <div className="contact__information">
                <RiMapPinFill className="contact__icon"/>


                <div>
                    <h3 className="contact__title">Message</h3>
                    <span className="contact__subtitle">Any details give us</span>
                </div>
                </div>
            </div>
            <form action="" className="contact__form style__grid">
            <div className="contact__inputs style__grid">
                <div className="contact__content">
                <label for="" className="contact__label">Name</label>
                <input 
                type="text" 
                className="contact__input"
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
                />
                </div>
                <div className="contact__content">
                <label for="" className="contact__label">Email</label>
                <input 
                type="email" 
                className="contact__input"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                />
                </div>
            </div>

            <div className="contact__content">
                <label for="" className="contact__label">Project</label>
                <input 
                type="text" 
                className="contact__input"
                value={project}
                onchange={(e) => setProject(e.currentTarget.value)}
                />
            </div>

            <div className="contact__content">
                <label for="" className="contact__label">Message</label>
                <textarea name="" id="" cols="0" rows="7" className="contact__input"></textarea>
            </div>

            <div>
                <a href="https://www.google.com/" className="button button--flex">Send Message
                <FaTelegramPlane className="button-icon"/>
                </a>
            </div>
            </form>
            <div className="contact__information">
            <FaMap className="contact__icon"/>

            <div>
                <h3 className="contact__title">Location</h3>
                <span className="contact__subtitle">Specific location</span>
            </div>
            </div>
                <div className="contact__map">
                    <iframe title="myFrame" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.7315078113265!2d153.0280748155045!3d-27.477616982887596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b915a104c721d41%3A0xaeb9c00d1ef00171!2sQUT%20Gardens%20Point%20Campus!5e0!3m2!1sen!2s!4v1628670649722!5m2!1sen!2s" style={{ border:0, width: 600, height: 450}} allowfullscreen="" loading="lazy"></iframe> 
                </div>
            </div> 
        </div>
    );
}