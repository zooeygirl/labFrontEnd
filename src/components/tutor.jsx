import React, { Component } from "react";
import auth from "../services/authService";
import Students from "./students";

//import Iframe from "react-iframe";

class Tutor extends Component {
  state = {
    name: "",
    isAdmin: false
  };

  componentDidMount() {
    const user = auth.getCurrentUser();
    if (user)
      this.setState({
        name: user.firstname + " " + user.lastname,
        isAdmin: user.isAdmin
      });
  }

  render() {
    const { name, isAdmin } = this.state;
    return (
      <div>
        <h1>Lab Exercises</h1>
        Current user: {name}
        <br />
        Is Admin? : {isAdmin ? "True" : "False"}
        <Students currentUser={name} userStatus={isAdmin} />
        {/* <Iframe
          src="https://quizlet.com/50105048/match/embed?i=8juvd&x=1jj1"
          height="300"
          width="80%"
          style="border:10"
        /> */}
      </div>
    );
  }
}

export default Tutor;
