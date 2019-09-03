import React, { Component } from "react";
import { getStudent } from "../services/studentService";

class Student extends Component {
  state = {
    _id: this.props.match.params.id,

    firstname: "",
    lastname: "",
    teacher: "",
    completed: [],
    dateCompleted: [],
    validatedBy: []
  };

  async componentDidMount() {
    const { data } = await getStudent(this.state._id);
    console.log(data);
    this.setState({
      firstname: data.firstname,
      lastname: data.lastname,
      teacher: data.teacher,
      completed: data.completed,
      dateCompleted: data.dateCompleted,
      validatedBy: data.validatedBy
    });
    console.log(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <h1>Student</h1>
        <div>Path: {this.props.match.params.id}</div>
        <p>Student First Name: {this.state.firstname}</p>
        <p>Student Last Name: {this.state.lastname}</p>
        <p>Teacher: {this.state.teacher}</p>
        <table className="table">
          <tbody>
            <tr>
              {this.state.completed.map((e, index) => (
                <td key={index}>{e === 1 ? "Completed" : "Not completed"}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Student;
