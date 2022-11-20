import React from "react";
import "./App.css";
import "./royi_style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";





export default function Footer() {

  return (
    <footer className="footer">
      <div className="footer__bg">
        <div className="footer__container container style__grid">
          <div>
             <h1 className="footer__title">Jordan Mcmahon</h1>
             <span className="footer__subtitle">Guitar Teacher</span>
          </div>
          <ul className="footer__links">
            <li>
              <a href="/about" className="footer__link">About</a>
            </li>
            <li>
              <a href="/pricing" className="footer__link">Price</a>
            </li>
            <li>
              <a href="/contact" className="footer__link">Contact me</a>
            </li>
          </ul>
        </div>      
        <p className="footer__copy">&#169; Jordan Guitar. All right reserved</p> 
      </div>
    </footer>
    
  );
}