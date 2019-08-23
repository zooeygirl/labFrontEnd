import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import loginForm from "./components/loginForm";
import registerForm from "./components/registerForm";
import tutor from "./components/tutor";
import Exercises from "./components/exercises";
import student from "./components/student";
import logout from "./components/logout";
import NavBar from "./components/navBar";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <div className="App">
        <NavBar user={this.state.user} />
        <div className="content">
          <Switch>
            <Route
              path="/exercises"
              render={props => <Exercises {...props} user={this.state.user} />}
            />
            <Route path="/login" component={loginForm} />
            <Route path="/logout" component={logout} />
            <Route path="/register" component={registerForm} />
            <ProtectedRoute path="/student/:id" component={student} />

            <Route path="/" exact component={tutor} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
