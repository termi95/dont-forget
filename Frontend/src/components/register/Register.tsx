import { Link } from "react-router-dom";
import "../../style/App.css";
import "../../style/login.css";
import { UseRegister } from "./UserRegister";

function Register(this: any) {
  const {
    handleSubmit,
    handleChange,
    userNameValidationHandler,
    passwordValidationHandler,
    emailValidationHandler,
    shake,
  } = UseRegister();

  return (
    <main>
      <form id="form" onSubmit={handleSubmit}>
        <h1 className="center">Register</h1>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="username"
          name="username"
          className="login-input"
          onChange={(e) => handleChange(e.target)}
        />
        {userNameValidationHandler()}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          placeholder="user@email.com"
          name="email"
          className="login-input"
          onChange={(e) => handleChange(e.target)}
        />
        {emailValidationHandler()}
        <label htmlFor="password">Password </label>
        <input
          id="password"
          type="password"
          placeholder="********"
          name="password"
          className="login-input"
          onChange={(e) => handleChange(e.target)}
        />
        {passwordValidationHandler()}
        <div className="right">
          <button className={"login-button space" + (shake ? ` shake` : '')} type="submit">
            Register
          </button>
          <button className="login-button">
            <Link to={`/`}>Login</Link>
          </button>
        </div>
      </form>
    </main>
  );
}

export default Register;
