import React, { useState} from "react";
import "./App.css";
import "./royi_style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { MdCheck } from "react-icons/md"


export default function Pricing() {
    
   

   return (
    <div>
         <h2 className="section__title">Pricing Designed for Scale</h2>
        <span className="section__subtitle">3-lessons free trail. All features included.</span>

        <div className="pricing__container container style__grid">
            <div className="pricing__card">
                <h6 className="pricing__type">30min</h6>
                <div className="pricing__first"><span className="pricing__span">$</span>35</div>
                <h5 className="pricing__plan">plan</h5>
                <ul className="pricing__details">
                <li className="pricing__li">One for One</li>
                <li className="pricing__li">FREE Instrument</li>
                <li className="pricing__li">High Quality</li>
                </ul>
                <div className="pricing__buy-button">
                <a href="/bookingCourses" className="pricing__btn">subscribe</a>
                </div>
            </div>  

            <div className="pricing__card">
                <h6 className="pricing__type">1hour</h6>
                <div className="pricing__second"><span className="pricing__span">$</span>60</div>
                <h5 className="pricing__plan">plan</h5>
                <ul className="pricing__details">
                <li className="pricing__li">One for One</li>
                <li className="pricing__li">FREE Instrument</li>
                <li className="pricing__li">High Quality</li>
                </ul>
                <div className="pricing__buy-button">
                <a href="/bookingCourses" className="pricing__btn">subscribe</a>
                </div>
            </div>  
        </div>
    </div>
);

    
}