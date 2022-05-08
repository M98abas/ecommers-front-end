import Cookies from "js-cookie";

export const URL = "https://ecommerse-8znkch2pa-m98abas.vercel.app";
// add
export const ApiLogin = (info: any, callback: any) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  fetch(`${URL}/admin/login`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(info),
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result: any) => {
      console.log(result);

      if (result.status) return callback(result, null);
      callback(null, "error occured");
    })
    .catch((error) => console.log("error", error));
};
export const ApiRegister = (info: any, callback: any) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify(info);
  var requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${URL}/admin/register`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status) return callback(result, null);
      callback(null, result.errMsg);
    })
    .catch((error) => console.log("error", error));
};
export const ApiProduct = async (callback: any) => {
  const token = await Cookies.get("adminToken");
  if (token) {
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${URL}/product`, requestOptions)
      .then((response) => response.json())
      .then((result: any) => {
        if (result) {
          return callback(result);
        }
        return callback(null, "Error Occured");
      })
      .catch((error) => console.log("error", error));
  }
};

export const ApiOrders = async (callback: any) => {
  const token = await Cookies.get("adminToken");
  if (token) {
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${URL}/orders`, requestOptions)
      .then((response) => response.json())
      .then((result: any) => {
        if (result) {
          return callback(result);
        }
        return callback(null, "Error Occured");
      })
      .catch((error) => console.log("error", error));
  }
};

export const ApiCategories = async (callback: any) => {
  const token = await Cookies.get("adminToken");
  if (token) {
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${URL}/product/categories`, requestOptions)
      .then((response) => response.json())
      .then((result: any) => {
        if (result) {
          console.log(result);
          return callback(result);
        }
        return callback(null, "Error Occured");
      })
      .catch((error) => console.log("error", error));
  }
};

export const ApiUsers = async (callback: any) => {
  const token = await Cookies.get("adminToken");
  if (token) {
    var myHeaders = new Headers();
    myHeaders.append("token", token);

    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${URL}/admin/customers/all`, requestOptions)
      .then((response) => response.json())
      .then((result: any) => {
        if (result) {
          console.log(result);
          return callback(result);
        }
        return callback(null, "Error Occured");
      })
      .catch((error) => console.log("error", error));
  }
};
