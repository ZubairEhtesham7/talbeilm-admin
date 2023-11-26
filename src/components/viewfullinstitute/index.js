import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import DislikedPost from "../dislikePost";
import Follower from "../followers";
import Followings from "../followings";
import LikedPost from "../likedPost";
import InsitutePost from "../viewFullInstitutdepost";
import "./style.css";

function ViewFullPostInfo() {
  let { id } = useParams();

  useEffect(() => {
    console.log(id);
  }, []);

  return (
    <div>
      <Row justify="center">
        <Col lg={6}>
          <h3 className="liketext">Liked Posts</h3>
          <div className="scrolldiv">
            <LikedPost />
            <LikedPost />
            <LikedPost />
          </div>
          <h3 className="liketext">Disliked Posts</h3>
          <div className="scrolldiv">
            <DislikedPost />
            <DislikedPost />
            <DislikedPost />
            <DislikedPost />
          </div>
        </Col>
        <Col lg={10}>
          <InsitutePost />
        </Col>

        <Col lg={6}>
          <h3 className="liketext"> Followers</h3>
          <div className="scrolldiv">
            <Follower />
            <Follower />
            <Follower />
            <Follower />
            <Follower />
          </div>
          <h3 className="liketext"> Followings</h3>
          <div className="scrolldiv">
            <Followings />
            <Followings />
            <Followings />
            <Followings />
            <Followings />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ViewFullPostInfo;
