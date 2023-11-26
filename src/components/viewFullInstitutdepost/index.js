import React from "react";
import Logo from "../images/pro.png";
import "./style.css";
import { DebounceInput } from "react-debounce-input";
import Logo6 from "../images/img.png";
import Logo5 from "../images/Vector.png";
import Logo7 from "../images/star.png";

function InsitutePost() {
  return (
    <div>
      <div className="a123">
        <div className="card12">
          <div className="maindiv ">
            <img className="instituteimg" src={Logo} alt="" />
            <h1 className="institutename">Institute name </h1>
            <p className="bio">
              Failed to parse source map:
              'webpack://antd/./components/config-provider/style/ source <br />
              map'webpack://antd/./components/icon/style/index.less' URL is not
              supported
            </p>
          </div>
          <div className="maindiv1">
            <DebounceInput
              className="innputt1"
              minLength={3}
              debounceTimeout={500}
            />
          </div>
          <div>
            <h1 className="post22">Posts</h1>
            <div className="a1324">
              <div className="card13">
                <img className="instituteimg2" src={Logo} alt="" />
                <div>
                  <p>
                    <b>Institute Name </b> share a post
                  </p>
                  <p className="timer">1 hour ago</p>
                </div>
              </div>
              <p>
                Here will be your caption. What ever you to add you can add over
                here. <br /> Here will be your caption. What ever you to add you
                can add over here.
              </p>
            </div>
            <div className="imgdivlogo">
              <img src={Logo6} alt="" />
              <div className="star12">
                <img src={Logo5} alt="" />
                <img src={Logo7} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsitutePost;
