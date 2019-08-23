import React, { Component } from "react";
import { Link } from "react-router-dom";
import TeacherNavBar from "./teacherNavBar";
import PopupExample from "./common/popup";
import { getExercises } from "./exercises";
import {
  getStudents,
  updateStudent,
  deleteStudent
} from "../services/studentService";

class Students extends Component {
  state = {
    selectedTeacher: null,
    selectedExercise: "000",
    exercises: ["Ex 1", "Ex 2", "Ex 3", "Ex 4", "Ex 5", "Ex 6"],
    searchValue: "",
    stu: [],
    exerciseArray: []
  };

  async componentDidMount() {
    const { data: students } = await getStudents();
    this.setState({ stu: students });
    const exerciseArray = await getExercises();
    this.setState({ exerciseArray });
  }

  async logClick(sId, idx) {
    console.log(this.state.selectedExercise);
    const studentsCopy = { ...this.state };
    const student = await studentsCopy.stu.find(s => s._id === sId);
    if (student.completed.length <= 6) {
      student.completed.push(this.state.selectedExercise);
      student.dateCompleted.push(new Date().toDateString());
      student.validatedBy.push(this.props.currentUser);

      try {
        await updateStudent(sId, student);
        this.setState(studentsCopy);
      } catch (ex) {
        alert("Change was not successful. " + ex);
      }
    }
    console.log(student.completed);
  }

  handleSelectExercise = async (student, exercise) => {
    await this.setState({ selectedExercise: exercise.index });
    this.logClick(student.student._id, exercise.index);
  };

  handleTeacherSelect = teacher => {
    console.log(teacher);
    this.setState({ selectedTeacher: teacher });
  };

  handleSearch(event) {
    console.log(event.target.value);
    this.setState({ searchValue: event.target.value });
  }

  handleDelete = async student => {
    const studentCopy = this.state.stu.slice();

    console.log(student);
    console.log(this.state.stu[0]);

    const students = this.state.stu.filter(s => s._id !== student);
    this.setState({ stu: students });

    try {
      await deleteStudent(student);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("This post has already been deleted.");
      else {
        console.log("Logging the error", ex);
        alert("An unexpected error occurred. ");
      }

      this.setState({ stu: studentCopy });
    }
  };

  render() {
    const { selectedTeacher, searchValue } = this.state;
    const filtered = selectedTeacher
      ? this.state.stu.filter(m => m.teacher === selectedTeacher)
      : this.state.stu;
    const searchFiltered =
      searchValue !== ""
        ? filtered.filter(s => s.username.toLowerCase().includes(searchValue))
        : filtered;

    return (
      <div>
        <TeacherNavBar onClick={this.handleTeacherSelect} />
        <p>Search Students: </p>{" "}
        <input
          value={this.state.searchValue}
          onChange={this.handleSearch.bind(this)}
        />
        <br />
        <br />
        <br />
        <table className="table">
          <thead>
            <tr>
              <td>Student</td>
              <td>Teacher</td>
              {this.state.exercises.map(e => (
                <td key={e}>{e}</td>
              ))}
              <td>Completed</td>
            </tr>
          </thead>
          <tbody>
            {searchFiltered.map(s => (
              <tr key={s.username}>
                <td>
                  <Link to={`/student/${s._id}`}>{s.username}</Link>
                </td>
                <td onClick={() => this.handleTeacherSelect(s.teacher)}>
                  {s.teacher}
                </td>
                {this.state.exercises.map((e, index) => (
                  <td key={index}>
                    <button
                      //onClick={() => this.logClick(s._id, index)}
                      disabled={this.props.userStatus === false}
                      className={
                        s.completed[index] !== undefined
                          ? "btn btn-primary"
                          : "btn btn-warning"
                      }
                    >
                      <PopupExample
                        title={e}
                        onClick={this.handleSelectExercise}
                        student={s}
                        completed={s.completed[index] + 1}
                        userStatus={this.props.userStatus}
                      />
                    </button>
                    <br />

                    {this.state.exerciseArray.length !== 0 &&
                    s.completed[index] !== undefined
                      ? this.state.exerciseArray[s.completed[index]]
                          .shortTitle +
                        "\n" +
                        "\n" +
                        s.dateCompleted[index] +
                        "\n" +
                        s.validatedBy[index]
                      : "Not complete"}
                  </td>
                ))}
                <td>
                  <span className="badge badge-primary">
                    {s.completed.length}
                  </span>
                </td>

                {this.props.userStatus === true ? (
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(s._id)}
                    >
                      Delete
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Students;
