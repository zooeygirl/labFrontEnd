import React, { Component } from "react";
import { getStudent } from "../services/studentService";

class Student extends Component {
  state = {
    _id: this.props.match.params.id,

    name: "",
    teacher: "",
    completed: [],
    dateCompleted: [],
    validatedBy: []
  };

  async componentDidMount() {
    const { data } = await getStudent(this.state._id);
    this.setState({
      name: data.name,
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
        <p>Student: {this.state.name}</p>
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
