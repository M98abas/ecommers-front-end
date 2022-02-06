import MainLayout from "../components/MainLayout";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import {
  message,
  Table,
  Button,
  Modal,
  Image,
  Form,
  Input,
  Select,
  Upload,
  InputNumber,
} from "antd";
const { Dragger } = Upload;
import { InboxOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
const { Option } = Select;
import { ApiCategories, ApiProduct, URL } from "../api";
import moment from "moment";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const products = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [image, setImage]: any = useState();
  const [category, setCategories] = useState([]);
  const [loading, setLoadin] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const Router = useRouter();

  /**
   *
   * @param row
   */
  const handelClickEdit = async (row: any) => {
    const token: any = await Cookies.get("adminToken");
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("Content-Type", "application/json");
    row.name = name;
    row.price = price;
    var raw = JSON.stringify(row);
    var requestOptions: any = {
      method: "put",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${URL}/product/update/${row.id}`, requestOptions)
      .then((response: any) => response.text())
      .then((result: any) => {
        message.success("The change is done !");
        Router.reload();
      })
      .catch((error) => console.log("error", error));
  };

  /**
   *
   * @param row
   */
  const handelClickDelete = async (row: any) => {
    const token: any = await Cookies.get("adminToken");
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions: any = {
      method: "put",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${URL}/product/delete/${row.id}`, requestOptions)
      .then((response: any) => response.text())
      .then((result: any) => {
        message.success("The product has been deleted !");
        Router.reload();
      })
      .catch((error) => console.log("error", error));
  };
  /**
   *
   */
  const getData = () => {
    setLoadin(true);
    ApiProduct((data: any, error: any) => {
      setLoadin(false);
      if (error) return message.error(error);
      setData(data);
    });
  };
  /**
   *
   */
  const categoryArray: any = [];
  category.map((item: any) => {
    categoryArray.push(<Option key={item.id}>{item.name}</Option>);
  });

  const ApiCategorie = () => {
    ApiCategories((data: any, error: any) => {
      if (error) return message.error(error);
      setCategories(data);
    });
  };

  useEffect(() => {
    getData();
    ApiCategorie();
  }, []);
  let imgbb = process.env.IMGBB;
  const columns: any = [
    {
      title: "IDs",
      dataIndex: "id",
      width: 50,
      sorter: (a: any, b: any) => a.id - b.id,
      render: (text: any, row: any, index: any) => <a>{text}</a>,

      defaultSortOrder: "descend",
    },
    {
      title: "",
      dataIndex: "image",
      render: (url: any) => (
        <Image className="table-image" width={50} src={url} />
      ),
      width: 50,
    },
    {
      title: "Product",
      dataIndex: "name",
      render: (name: any) => (
        <input
          className="valueInputStyling"
          defaultValue={name}
          onChange={(e: any) => setName(e.target.value)}
        />
      ),
      width: 200,
    },

    {
      title: "Price",
      dataIndex: "price",
      render: (data: any) => (
        <input
          className="valueInputStyling"
          defaultValue={data}
          onChange={(e: any) => setPrice(e.target.value)}
        />
      ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      render: (data: any) => <strong>{data}</strong>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date: any) => moment(date).format("DD/MM/yyyy, hh:mm A"),
    },
    {
      title: "",
      dataIndex: "createdAt",
      render: (data: any, row: any) => (
        <>
          <Button onClick={() => handelClickEdit(row)} type="primary">
            <AiFillEdit />
            Edit
          </Button>{" "}
          <Button onClick={() => handelClickDelete(row)} type="primary" danger>
            <AiFillDelete /> Delete
          </Button>
        </>
      ),
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinish = (values: any) => {
    setLoadin(true);
    var formdata = new FormData();
    formdata.append("image", image, image.name);

    var requestOptions: any = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    console.log(imgbb);

    fetch(
      `https://api.imgbb.com/1/upload?key=807b79b03a554f95b5980b6b9d688013`,
      requestOptions
    )
      .then((response) => response.json())
      .then(async (result) => {
        console.log(result);

        const imageToUpload = result.data.url;
          
        const token: any = await Cookies.get("adminToken");
        var myHeaders = new Headers();
        myHeaders.append("token", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          ...values,
          image: imageToUpload,
        });
        var requestOptions: any = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(`${URL}/product`, requestOptions)
          .then((response) => response.text())
          .then((result) => {
            message.success("uploaded successfully");
            setLoadin(false);
            getData();
            handleCancel();
          })
          .catch((error) => console.log("error", error));
      })
      .catch((e) => console.log(e));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleImageUpload = ({ fileList }: any) => {
    if (fileList[0]) {
      setImage(fileList[0].originFileObj);
    }
  };

  return (
    <div className="home-container">
      <Modal
        title="add Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Dragger onChange={handleImageUpload}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>

        <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <p>Product Name</p>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input product name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <p>Description</p>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Please input description",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <div style={{ display: "flex" }}>
            <p>Price</p>{" "}
            <Form.Item
              style={{ marginRight: 10, marginLeft: 10 }}
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input price",
                },
              ]}
            >
              <InputNumber defaultValue={0} min={0} />
            </Form.Item>
            <p style={{ marginRight: 10, marginLeft: 10 }}>stock</p>{" "}
            <Form.Item
              name="stock"
              rules={[
                {
                  required: true,
                  message: "Please input stock",
                },
              ]}
            >
              <InputNumber defaultValue={0} min={0} />
            </Form.Item>
          </div>

          <div style={{ display: "flex" }}>
            <p style={{ marginRight: 10, marginLeft: 10 }}>Category</p>{" "}
            <Form.Item
              name="category_id"
              rules={[
                {
                  required: true,
                  message: "Please input stock",
                },
              ]}
            >
              <Select defaultValue={categoryArray[0]} style={{ width: 120 }}>
                {categoryArray}
              </Select>
            </Form.Item>
          </div>
          <Form.Item>
            <Button
              loading={loading}
              disabled={loading}
              type="primary"
              htmlType="submit"
            >
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <MainLayout />
      <div className="container">
        <div className="header">
          <h1>Products</h1>
          <div className="cont-btn">
            <Button onClick={showModal} type="primary">
              Add Produc
            </Button>
          </div>
        </div>
        <Table
          scroll={{ x: "700px" }}
          pagination={{
            defaultPageSize: 10,
          }}
          size="small"
          rowKey={(record: any) => record.id}
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.description}</p>
            ),
            rowExpandable: (record) => true,
          }}
          loading={loading}
          className="table"
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
};

export default products;
