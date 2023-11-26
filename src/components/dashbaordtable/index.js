import React, { useState } from "react";
import "./style.css";
import { Space, Table, Modal } from "antd";
import Logo from "../images/img.png";
import Logo2 from "../images/Vector.png";
import Logo3 from "../images/star.png";
const data = [
  {
    key: "1",
    number: "20",
    like: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    number: "20",
    like: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    number: "20",
    like: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

function Dashbaordtable() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const columns = [
    {
      title: "Topics",
      dataIndex: "like",
      key: "like",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Post by",
      dataIndex: "like",
      key: "like",
    },
    {
      title: "Like",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Followers",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Edit",
      key: "action",
      render: (record) => <a onClick={showModal}>Edit</a>,
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Here will be your caption. What ever you to add you can add over here.
          Here will be your caption. What ever you to add you can add over here.{" "}
        </p>
        <div className="modalimg">
          <img src={Logo} alt="" />
          <div className="likemodel">
            <div className="likemo">
              <p className="textmo">80k</p>
            </div>
            <div className="likemo">
              <img src={Logo3} alt="" />
              <p className="textmo">4.5 rating</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Dashbaordtable;
