import React, { useState, useEffect } from "react";
import "./style.css";
import DataTable from "react-data-table-component";
import {
  Modal,
  message,
  Select,
  Typography,
  Button,
  Form,
  Input,
  Row,
  Col,
} from "antd";
import { users, searchuser } from "../../helper/axios";
import { DeleteFilled } from "@ant-design/icons";
import Search22 from "../search";

const { Paragraph } = Typography;
const { Option } = Select;

function Usertable() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const [loading, setloading] = useState(false);
  const [addloading, setaddloading] = useState(false);
  const [data, setdata] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchstring, setsearchstring] = useState("");
  const [isFilterApplied, setisFilterApplied] = useState(false);
  const [rowdata, setRowData] = useState();
  const [loadingedit, setLoadingEdit] = useState(false);
  const [areaofintrestofrow, setareaofintrestofrow] = useState([]);

  const showModal = (row) => {
    setRowData(row);
    let array = [];

    for (let i = 0; i < row?.areaOfIntrest?.length; i++) {
      array.push(<Option key={i}>{row.areaOfIntrest[i]}</Option>);
    }
    setareaofintrestofrow(array);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  ///////////////////////////////////////

  const addModal = () => {
    setIsModalShow(true);
  };
  const clickOk = () => {
    setIsModalShow(false);
  };
  const clickCancel = () => {
    setIsModalShow(false);
  };

  const handleChange = (value) => {
    setRowData((prevState) => ({
      ...prevState,
      areaOfIntrest: value,
    }));
  };

  const handleUpdate = () => {
    setLoadingEdit(true);
    let token = localStorage.getItem("talbeilm-token");

    let data = {
      name: rowdata.name,
      address: rowdata.address,
      number: rowdata.number,
      areaOfIntrest: rowdata.areaOfIntrest,
    };
    users(`/${rowdata?.id}`, {
      method: "patch",
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setLoadingEdit(false);
        setIsModalVisible(false);
        message.success("Updated!");
        getUsers();
      })

      .catch(() => {
        setLoadingEdit(false);
        message.error("something went wrong, please try again!");
      });
  };

  const onFinish = (values) => {
    setaddloading(true);
    values.role = "user";
    let token = localStorage.getItem("talbeilm-token");

    users({
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: values,
    })
      .then(() => {
        setaddloading(false);
        setIsModalShow(false);
        form.resetFields();
        message.success("User created!");
      })
      .catch(() => {
        setaddloading(false);
        message.error("an error occured please try later");
      });
  };

  const deleteOperation = (id) => {
    let token = localStorage.getItem("talbeilm-token");

    users(`/${id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        message.success("User Deleted");
        getUsers();
      })
      .catch(() => {
        message.error("an error occured please try later");
      });
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name,
    },
    {
      name: "Followings",
      selector: (row) => row?.followings.length,
    },

    {
      name: "Post Liked",
      selector: (row) => row?.likedPosts.length,
    },
    {
      name: "Post DisLiked",
      selector: (row) => row?.dislikedPosts.length,
    },
    {
      name: "Edit",
      selector: (row) => <a onClick={() => showModal(row)}>Edit</a>,
    },
    {
      name: "Delete",
      selector: (row) => (
        <>
          <a onClick={() => deleteOperation(row.id)}>
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

  const getUsers = () => {
    setloading(true);
    let token = localStorage.getItem("talbeilm-token");

    users({
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },

      params: {
        role: "user",
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

  const getUserBysearch = () => {
    setloading(true);
    let token = localStorage.getItem("talbeilm-token");

    searchuser(`/${searchstring}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        role: "user",
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
    if (searchstring.length >= 3) {
      setisFilterApplied(true);
    } else {
      setisFilterApplied(false);
    }
  }, [searchstring]);

  useEffect(() => {
    if (!isModalShow) {
      if (!isFilterApplied) {
        getUsers();
      } else {
        if (searchstring.length >= 3) {
          getUserBysearch();
        }
      }
    }
  }, [perPage, currentPage, isFilterApplied, searchstring, isModalShow]);

  return (
    <div>
      <div className="centerinputbtn">
        <div className="input22">
          <Search22
            searchstring={searchstring}
            setsearchstring={setsearchstring}
          />
        </div>
        <div className="institutebtn">
          <Button onClick={addModal} type="primary">
            Add User
          </Button>
        </div>
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
        title="Edit User"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row>
          <Col lg={10} md={10} xs={24}>
            <div>
              <p>Email</p>
              {rowdata?.email}
            </div>
          </Col>
          <Col lg={10} md={10} xs={24}>
            <div>
              <p>Name</p>
              <Paragraph
                editable={{
                  onChange: (str) => {
                    setRowData((prevState) => ({
                      ...prevState,
                      name: str,
                    }));
                  },
                }}
              >
                {rowdata?.name}
              </Paragraph>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={10} md={10} xs={24}>
            <div>
              <p>Address</p>
              <Paragraph
                editable={{
                  onChange: (str) => {
                    setRowData((prevState) => ({
                      ...prevState,
                      address: str,
                    }));
                  },
                }}
              >
                {rowdata?.address}
              </Paragraph>
            </div>
          </Col>
          <Col lg={10} md={10} xs={24}>
            <div>
              <p>Number</p>
              <Paragraph
                editable={{
                  onChange: (str) => {
                    setRowData((prevState) => ({
                      ...prevState,
                      number: str,
                    }));
                  },
                }}
              >
                {rowdata?.number}
              </Paragraph>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={10} md={10} xs={24}>
            <div>
              <p>Followers</p>
              <p className="textedit"> 0</p>
            </div>
          </Col>
          <Col lg={10} md={10} xs={24}>
            <div>
              <p>Followings</p>
              <p className="textedit"> 0</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={10} md={10} xs={24}>
            <div>
              <p>Likeds</p>
              <p className="textedit"> 0</p>
            </div>
          </Col>
          <Col lg={10} md={10} xs={24}>
            <div>
              <p>Dislikeds</p>
              <p className="textedit"> 0</p>
            </div>
          </Col>
        </Row>
        <div>
          <h3>Area Of Interests:</h3>
          <Select
            mode="tags"
            style={{
              width: "100%",
            }}
            placeholder="Interests"
            onChange={handleChange}
          >
            {areaofintrestofrow}
          </Select>
        </div>
        <div className="btnupdate">
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleUpdate}
            loading={loadingedit}
          >
            Update
          </Button>
        </div>
      </Modal>
      <Modal
        footer={null}
        title="Add User"
        visible={isModalShow}
        onCancel={clickCancel}
        onOk={clickOk}
      >
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          value={users}
          onChange={handleChange}
        >
          <Form.Item
            name="name"
            label="User Name"
            rules={[
              {
                required: true,
                message: "Please input your institute Name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="number"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: "Please input address",
              },
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={addloading}>
              Create User
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Usertable;
