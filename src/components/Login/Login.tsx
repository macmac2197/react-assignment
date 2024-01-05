import React, { useMemo, useState } from "react";
import { User } from "../../types/userInterface";
import { isEmpty } from "../../utils/isEmpty";
import users from "../../data/users.json";

import { useDispatch } from "react-redux";
import { loginUser } from "../../types/actions";
import { useHistory } from "react-router-dom";

import "./Login.css";

const userInitialState: User = {
  username: "",
  password: "",
};

interface formErrorState {
  [key: string]: string;
  error: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [userCredential, setUserCredential] = useState<User>(userInitialState);
  const [formError, setFormError] = useState<formErrorState>({
    username: "",
    password: "",
    error: "",
  });

  const isEnabled = useMemo(() => {
    return (
      !isEmpty(userCredential.username) && !isEmpty(userCredential.password)
    );
  }, [userCredential.username, userCredential.password]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setUserCredential({ ...userCredential, [name]: value });
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;

    if (value === "" || value === null) {
      setFormError({
        ...formError,
        [name]: `${name} field is required.`,
      });
    } else {
      setFormError({
        ...formError,
        [name]: "",
      });
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Authenticate user credential
    const user = users.find(
      (u: any) =>
        u.username === userCredential.username &&
        u.password === userCredential.password
    );

    if (user) {
      setFormError({ error: "" });
      dispatch(loginUser(userCredential));

      // Redirect to dashboard page after sucessfully user selectIsAuthenticated.
      history.push("/dashboard");
    } else {
      setFormError({ error: "Invalid username/password!" });
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2>Login</h2>
        {formError.error && <p className="error-message">{formError.error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-field">
            <input
              value={userCredential.username}
              onChange={handleInputChange}
              onBlur={handleOnBlur}
              type="text"
              name="username"
              placeholder="Username"
            />
            {formError.username && (
              <div className="text-error">{formError.username}</div>
            )}
          </div>
          <div className="form-field">
            <input
              value={userCredential.password}
              onChange={handleInputChange}
              onBlur={handleOnBlur}
              type="password"
              name="password"
              placeholder="Password"
            />
            {formError.password && (
              <div className="text-error">{formError.password}</div>
            )}
          </div>
          <button type="submit" disabled={!isEnabled}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
