import React from "react";
import "./style.css";
import Logo from "../images/pro.png";
function Card() {
  return (
    <div>
      <div className="maincard">
        <div className="subcard">
          <h3 className="card11">Like for day </h3>
          <img className="cardlog" src={Logo} alt="" />
        </div>
        <h1 className="card22">30,3333</h1>
        <div className="cardtextdiv">
          <p className="card33">3.48%</p>
          <p className="card44"> Since last Week</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
