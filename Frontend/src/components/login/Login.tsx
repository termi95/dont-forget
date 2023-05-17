import { Link } from "react-router-dom";
import { UseLogin } from "./UseLogin";
import "../../style/login.scss";
import Toast from "../toast";

function Login() {
  const { handleSubmit, handleChange } = UseLogin();
  return (
    <>
      <main>
        <form id="form" onSubmit={handleSubmit}>
          <h1 className="center">Sign Up</h1>
          <label className="login-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="user@email.com"
            className="login-input"
            onChange={(e) => handleChange(e.target)}
          />
          <label className="login-label" htmlFor="password">
            Password{" "}
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="login-input"
            placeholder="********"
            onChange={(e) => handleChange(e.target)}
          />
          <div className="right">
            <button className="login-button space" type="submit">
              Login
            </button>
            <button className="login-button">
              <Link to={`register`}>Register</Link>
            </button>
          </div>
        </form>
      </main>
      <Toast message="message" title="title" type="danger" />
    </>
  );
}

export default Login;
