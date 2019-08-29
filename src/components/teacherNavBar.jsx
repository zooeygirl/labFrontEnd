import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getTeachers } from "../services/teacherService";
class TeacherNavBar extends Component {
  state = { teachers: [] };

  async componentDidMount() {
    const { data: teachers } = await getTeachers();
    this.setState({ teachers: teachers.map(t => t.lastname) });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="nav">
            {this.state.teachers.map((t, index) => (
              <Link
                key={index}
                onClick={() => this.props.onClick(t.username)}
                className="nav-item nav-link"
                to="/"
              >
                {t.username}
              </Link>
            ))}
            <Link
              className="nav-item nav-link"
              onClick={() => this.props.onClick(null)}
              to="/"
            >
              All Teachers
            </Link>
          </ul>
        </nav>
      </div>
    );
  }
}

export default TeacherNavBar;
