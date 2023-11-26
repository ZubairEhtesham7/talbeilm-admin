import React from "react";
import Logo from "../images/pro.png";
import "./style.css";
import Logo6 from "../images/img.png";
import Logo5 from "../images/Vector.png";
import Logo7 from "../images/star.png";

function LikedPost() {
  return (
    <div>
      <div className="a132422">
        <div className="card1322">
          <img className="instituteimg222" src={Logo} alt="" />
          <div>
            <p>
              <b>Institute Name </b> share a post
            </p>
            <p>1 hour ago</p>
          </div>
        </div>
        <p>
          Here will be your caption. What ever you <br /> to add you can add
          over here
        </p>
      </div>
      <div className="imgdivlogo22">
        <img src={Logo6} alt="" />
        <div className="star1222">
          <img src={Logo5} alt="" />
          <img src={Logo7} alt="" />
        </div>
      </div>
    </div>
  );
}

export default LikedPost;
