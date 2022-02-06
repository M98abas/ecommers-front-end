import Cookies from "js-cookie";
import { useState } from "react";
import { ApiRegister } from "../api";
import { useRouter } from "next/router";

import Link from "next/link";

const register = () => {
  const [email, setEmail]: any = useState("");
  const [nickname, setNickName]: any = useState("");
  const [password, setPassword]: any = useState("");
  const router = useRouter();
  const handleRegister = (e: any) => {
    e.preventDefault();
    ApiRegister({ email, nickname, password }, (data: any, error: any) => {
      if (error) return alert(error);
      Cookies.set("registerToken", data.token);
      router.push("/login");
    });
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <div className="stripe">
          <h1>CollageStore</h1>
        </div>
        <div className="right-side">
          <form onSubmit={handleRegister}>
            <p className="label">Email</p>
            <input
              required
              placeholder="Example@something.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
            <p className="label">nickname</p>
            <input
              required
              placeholder="John Doe"
              value={nickname}
              onChange={(e) => setNickName(e.target.value)}
              type="text"
            />
            <p className="label">Password</p>
            <input
              required
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <button type="submit">Sign Up</button>
            <div
              className="links-container"
              style={{ marginTop: 10, alignSelf: "center" }}
            >
              <p>Already have an account?</p>
              <Link href="/login">
                <p className="sign-up-link">Login</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default register;
