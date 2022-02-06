import MainLayout from "../components/MainLayout";
import { message, Table, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { ApiUsers } from "../api";
import moment from "moment";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const users = () => {
  const [data, setData] = useState([]);
  const [loading, setLoadin] = useState(false);

  const Router = useRouter();

  const ApiUser = () => {
    ApiUsers((data: any, error: any) => {
      if (error) return message.error(error);
      setData(data);
    });
  };

  // console.log(data[0].Orders);

  /**
   *
   * @param row
   
  const handelClickEdit = async (row: any) => {
    const token: any = await Cookies.get("adminToken");
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("Content-Type", "application/json");
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
*/
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
  useEffect(() => {
    ApiUser();
  }, []);
  const columns: any = [
    {
      title: "IDs",
      dataIndex: "id",
      width: 50,
      sorter: (a: any, b: any) => a.id - b.id,
      defaultSortOrder: "descend",
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (data: any) => data,
    },
    {
      title: "Username",
      dataIndex: "fullname",
      render: (name: any) => <strong>{name}</strong>,
      width: 200,
    },

    {
      title: "Address",
      dataIndex: "address",
      render: (data: any) => data,
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      render: (data: any) => data,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date: any) => moment(date).format("DD/MM/yyyy, hh:mm A"),
    },
    ,
    {
      title: "",
      dataIndex: "createdAt",
      render: (data: any, row: any) => (
        <>
          <Button onClick={() => handelClickDelete(row)} type="primary" danger>
            <AiFillDelete /> Delete
          </Button>
        </>
      ),
    },
  ];
  return (
    <div className="home-container">
      <MainLayout />
      <div className="container">
        <div className="header">
          <h1>Users</h1>
        </div>
        <Table
          scroll={{ x: "700px" }}
          pagination={{
            defaultPageSize: 7,
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

export default users;
