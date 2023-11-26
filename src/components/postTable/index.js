import React, { useState, useEffect } from "react";
import "./style.css";
import { Modal, message, Col, Row } from "antd";
import DataTable from "react-data-table-component";
import { posts } from "../../helper/axios";
import Search22 from "../search";
import { DeleteFilled } from "@ant-design/icons";
import ReactAudioPlayer from "react-audio-player";

function Postable() {
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchstring, setsearchstring] = useState("");
  const [rowdata, setRowData] = useState();

  const showModal = (row) => {
    setRowData(row);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const deletePostOperation = (_id) => {
    let token = localStorage.getItem("talbeilm-token");

    posts(`/${_id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        message.success("User Deleted");
        getPost();
      })
      .catch(() => {
        message.error("an error occured please try later");
      });
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => row?.title,
    },
    {
      name: "Post by",
      selector: (row) => row?.postedbyobject[0]?.name,
    },
    {
      name: "Likes",
      selector: (row) => row?.likes.length,
    },
    {
      name: "Dislikes",
      selector: (row) => row?.disLikes.length,
    },
    {
      name: "Edit",
      selector: (row) => <a onClick={() => showModal(row)}>Edit</a>,
    },
    {
      name: "Delete",
      selector: (row) => (
        <>
          <a onClick={() => deletePostOperation(row._id)}>
            <DeleteFilled style={{ fontSize: "1rem", color: "grey" }} />
          </a>
        </>
      ),
    },
  ];
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage) => {
    setPerPage(newPerPage);
  };

  const getPost = () => {
    setloading(true);
    let token = localStorage.getItem("talbeilm-token");
    posts({
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: currentPage,
        limit: perPage,
      },
    })
      .then((res) => {
        setdata(res.data.results);
        setTotalRows(res.data.totalResults);
        setloading(false);
      })
      .catch(() => {
        message.error("an error occured please try later");
        setloading(false);
      });
  };
  useEffect(() => {
    getPost();
  }, [currentPage, perPage]);

  return (
    <div>
      <div className="input22">
        <Search22
          searchstring={searchstring}
          setsearchstring={setsearchstring}
        />
      </div>
      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationDefaultPage={currentPage}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
      <Modal
        title={rowdata?.title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Row>
          <Col lg={10} md={10} xs={24}>
            <p>Post Likes</p>
          </Col>
          <Col lg={10} md={10} xs={24}>
            <p> {rowdata?.likes.length}</p>
          </Col>
        </Row>
        <Row>
          <Col lg={10} md={10} xs={24}>
            <p>Post Dislikes</p>
          </Col>
          <Col lg={10} md={10} xs={24}>
            <p> {rowdata?.disLikes.length}</p>
          </Col>
        </Row>
        <Row>
          <Col lg={10} md={10} xs={24}>
            <p>Posted By</p>
          </Col>
          <Col lg={10} md={10} xs={24}>
            <p> {rowdata?.postedbyobject[0]?.name}</p>
          </Col>
        </Row>
        <Row>
          <Col lg={10} md={10} xs={24}>
            <p>Institute Followers</p>
          </Col>
          <Col lg={10} md={10} xs={24}>
            <p>{rowdata?.postedbyobject[0]?.followers.length}</p>
          </Col>
        </Row>
        <Row>
          <Col lg={10} md={10} xs={24}>
            <p>Institute Followings</p>
          </Col>
          <Col lg={10} md={10} xs={24}>
            <p>{rowdata?.postedbyobject[0]?.followings.length}</p>
          </Col>
        </Row>
        <Row>
          <Col lg={10} md={10} xs={24}>
            <p>Institute Liked Post</p>
          </Col>
          <Col lg={10} md={10} xs={24}>
            <p>{rowdata?.postedbyobject[0]?.likedPosts.length}</p>
          </Col>
        </Row>
        <Row>
          <Col lg={10} md={10} xs={24}>
            <p>Institute Disliked Post</p>
          </Col>
          <Col lg={10} md={10} xs={24}>
            <p>{rowdata?.postedbyobject[0]?.dislikedPosts.length}</p>
          </Col>
        </Row>
        <Row>
          <Col lg={10} md={10} xs={24}>
            {rowdata?.attachmentType === "picture" && (
              <div className="divdiv">
                <img
                  className="imgpost"
                  src={rowdata?.attachtmentLink}
                  alt=""
                />
              </div>
            )}
            {rowdata?.attachmentType === "video" && (
              <div className="divdiv">
                <video width="150" height="150" controls>
                  <source src={rowdata?.attachtmentLink} type="video/mp4" />
                </video>
              </div>
            )}
            {rowdata?.attachmentType === "audio" && (
              <div className="divdiv">
                <ReactAudioPlayer
                  src={rowdata?.attachtmentLink}
                  autoPlay
                  controls
                  style={{ width: "10rem" }}
                />
              </div>
            )}
            {rowdata?.attachtmentType === "none" && <div></div>}
          </Col>
          <Col lg={10} md={10} xs={24}>
            <div className="divdiv">
              <p>Description</p>
              <p className="detext"> {rowdata?.description}</p>
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default Postable;
