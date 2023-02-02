import { Link } from "react-router-dom";
import { UseLogin } from "./UseLogin";
import "../../style/App.css";
import "../../style/login.css";

function Login() {
  const { handleSubmit, handleChange } = UseLogin();
  return (
    <main>
      <form id="form" onSubmit={handleSubmit}>
        <h1 className="center">Sign Up</h1>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          name="email"
          placeholder="user@email.com"
          onChange={(e) => handleChange(e.target)}
        />
        <label htmlFor="password">Password </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="********"
          onChange={(e) => handleChange(e.target)}
        />
        <div className="right">
          <button className="space" type="submit">
            Login
          </button>
          <button>
            <Link to={`register`}>Register</Link>
          </button>
        </div>
      </form>
    </main>
  );
}

export default Login;
