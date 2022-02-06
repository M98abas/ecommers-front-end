import MainLayout from "../components/MainLayout";
import Link from "next/link";

const Home = () => {
  return (
    <div className="home-container">
      <MainLayout />
      <div className="home-content">
        <Link href="/products">
          <div className="card products">
            <img src="./images/store.svg" alt="Store ICON" />
            <h1>Warehouse</h1>
          </div>
        </Link>
        <Link href="/users">
          <div className="card users">
            <img src="./images/users.svg" alt="Users ICON" />
            <h1>Users</h1>
          </div>
        </Link>
        <Link href="/orders">
          <div className="card users">
            <img src="./images/orders.svg" alt="Order ICON" />
            <h1>Orders</h1>
          </div>
        </Link>
        <Link href="/categories">
          <div className="card users">
            <img src="./images/categories.svg" alt="categories ICON" />
            <h1>Categories</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
