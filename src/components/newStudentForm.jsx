import React, { Component } from "react";
import { newStudent } from "../services/studentService";
import Input from "./common/input";
import Select from "./common/select";

class NewStudentForm extends Component {
  state = {
    teacherOptions: ["Brooke", "Erin", "Jane"],
    account: { name: "", teacher: "Brooke", classroom: 1 }
  };

  handleSubmit = e => {
    e.preventDefault();
    const student = {
      ...this.state.account,
      completed: [0, 0, 0],
      dateCompleted: [0, 0, 0],
      validatedBy: [0, 0, 0]
    };
    console.log(student);
    const result = newStudent(student);
    console.log(result);
  };

  handleChange = e => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    console.log(e.currentTarget.value);
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>New Student</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="name"
            value={account.name}
            label="Name"
            onChange={this.handleChange}
          />

          <Select
            name="teacher"
            value={account.teacher}
            onChange={this.handleChange}
            options={this.state.teacherOptions}
          />

          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    );
  }
}

export default NewStudentForm;
