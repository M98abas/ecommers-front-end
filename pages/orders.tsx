import MainLayout from "../components/MainLayout";
import { message, Table, Button } from "antd";
import { useEffect, useState } from "react";
import { ApiOrders } from "../api";
import moment from "moment";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const Orders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoadin] = useState(false);
  const [status, setStatus] = useState("");
  const Router = useRouter();

  const ApiOrder = () => {
    ApiOrders((data: any, error: any) => {
      if (error) return message.error(error);
      setData(data);
    });
  };

  const handelClickEdit = async (row: any) => {
    const token: any = await Cookies.get("adminToken");
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("Content-Type", "application/json");
    row.order_status = status;
    var raw = JSON.stringify(row);
    var requestOptions: any = {
      method: "put",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${URL}/orders/update/${row.id}`, requestOptions)
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

    fetch(`${URL}/orders/delete/${row.id}`, requestOptions)
      .then((response: any) => response.text())
      .then((result: any) => {
        message.success("The product has been deleted !");
        Router.reload();
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    ApiOrder();
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
      title: "UserName",
      dataIndex: "customer",
      render: (email: any) => <strong>{email.fullname}</strong>,
    },
    {
      title: "Phone",
      dataIndex: "customer",
      render: (name: any) => <strong>{name.phone}</strong>,
      width: 200,
    },

    {
      title: "Address",
      dataIndex: "customer",
      render: (data: any) => <strong>{data.address}</strong>,
    },
    {
      title: "Order Product",
      ddataIndex: "orders",
      render: (data: any) => <strong>{data.orders[0].product.name}</strong>,
    },
    {
      title: "Stock",
      dataIndex: "amount",
      render: (data: any) => <strong>{data}</strong>,
    },
    {
      title: "Send at",
      dataIndex: "order_date",
      render: (date: any) => moment(date).format("DD/MM/yyyy, hh:mm A"),
    },

    ,
    {
      title: "",
      dataIndex: "createdAt",
      render: (data: any, row: any) => (
        <>
          <Button onClick={() => handelClickEdit(row)} type="primary">
            <AiFillEdit /> Edit
          </Button>{" "}
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
          <h1>Orders</h1>
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
              <input
                style={{ margin: 0 }}
                defaultValue={record.order_status}
                onChange={(e: any) => setStatus(e.target.value)}
              />
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

export default Orders;
