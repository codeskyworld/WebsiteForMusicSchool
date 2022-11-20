import React from "react";
import "./App.css";
import "./royi_style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import img5 from "./img/img5.jpg"

export default function About() {

    return (
        <div id="aboutMe" className="container mt-3">
            <h2 className="section__title">About me</h2>
            <p className="section__subtitle">My introduction</p>
            <div id="img5" alt="We need an image">
                <img
                    src={img5}
                />
            </div>
            <div className="mt-3">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis illo ducimus sit laborum vero maiores repudiandae voluptates ipsa,
                </p>
            </div>


            <div className="about__info">
                <div>
                    <div className="about__info-title">08+</div>
                    <div className="about__info-name">Years experience</div>
                </div>

                <div>
                    <div className="about__info-title">200+</div>
                    <div className="about__info-name">Students graduate</div>
                </div>

                <div>
                    <div className="about__info-title">15+</div>
                    <div className="about__info-name">Music  pricings</div>
                </div>
            </div>


            <div id="skillBar" className="container skills__open">
                <div className="skills__header">

                </div>

                <div className="skills__list grid">
                    <div className="skills__data">
                        <div className="skills__titles">
                            <h3 className="skills__name">Electric Guitar</h3>
                            <span className="skills__number">90%</span>
                        </div>

                        <div className="skills__bar">
                            <span className="skills__percentage skills__electric"></span>
                        </div>
                    </div>

                    <div className="skills__data">
                        <div className="skills__titles">
                            <h3 className="skills__name">Classical Guitar</h3>
                            <span className="skills__number">80%</span>
                        </div>

                        <div className="skills__bar">
                            <span className="skills__percentage skills__classical"></span>
                        </div>
                    </div>

                    <div className="skills__data">
                        <div className="skills__titles">
                            <h3 className="skills__name">Bass Guitar</h3>
                            <span className="skills__number">60%</span>
                        </div>

                        <div className="skills__bar">
                            <span className="skills__percentage skills__bass"></span>
                        </div>
                    </div>

                    <div className="skills__data">
                        <div className="skills__titles">
                            <h3 className="skills__name">Acousitic Guitar</h3>
                            <span className="skills__number">40%</span>
                        </div>

                        <div className="skills__bar">
                            <span className="skills__percentage skills__acousitic"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}