import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import { loginUser } from "./types/actions";
import { RootState } from "./redux/store";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    // Simulate checking if the user is authenticated
    const storeAuthtate = localStorage.getItem("authState");
    if (storeAuthtate) {
      const parsedAuthState = JSON.parse(storeAuthtate);

      if (parsedAuthState.isAuthenticated) {
        dispatch(loginUser(parsedAuthState));
      }
    }
  }, [dispatch]);

  return (
    <Switch>
      <Route
        path="/login"
        render={() =>
          isAuthenticated ? <Redirect to="/dashboard" /> : <Login />
        }
      />
      <Route
        path="/dashboard"
        render={() =>
          isAuthenticated ? <Dashboard /> : <Redirect to="/login" />
        }
      />
      <Route
        path="/"
        exact
        render={() =>
          isAuthenticated ? (
            <>
              <Redirect to="/dashboard" />
            </>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    </Switch>
  );
};

export default App;
