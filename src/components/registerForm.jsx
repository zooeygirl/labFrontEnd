import React, { Component } from "react";
import Input from "../components/common/input";
import Select from "../components/common/select";
import * as userService from "../services/userService";
import Joi from "joi-browser";
import { getTeachers } from "../services/teacherService";

class registerForm extends Component {
  state = {
    account: {
      firstname: "",
      lastname: "",
      password: "",
      email: "",
      role: "Student",
      adminPassword: "password",
      teacher: ""
    },
    roleOptions: ["Tutor", "Teacher", "Student"],
    teacherOptions: [""],
    errors: {}
  };

  async componentDidMount() {
    const { data: teachers } = await getTeachers();
    this.setState({
      teacherOptions: teachers
    });
  }

  schema = {
    firstname: Joi.string()
      .required()
      .label("Firstname"),
    lastname: Joi.string()
      .required()
      .label("Lastname"),
    role: Joi.string()
      .required()
      .label("Role"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    teacher: Joi.string()
      .min(0)
      .label("Teacher"),
    adminPassword: Joi.string()
      .allow("")
      .label("adminPassword")
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = async e => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;

    try {
      const response = await userService.newUser(this.state.account);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.firstname = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  validateProperty = ({ name, value }) => {
    console.log(name);
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    if (error) {
      return error.details[0].message;
    } else return null;
  };

  handleChange = e => {
    const target = e.currentTarget;
    const errors = { ...this.state.errors };

    const errorMessage = this.validateProperty(target);
    console.log("Error Message", errorMessage);
    if (errorMessage) errors[target.name] = errorMessage;
    else delete errors[target.name];

    const account = { ...this.state.account };
    account[target.name] = target.value;
    if (target.name === "role") {
      if (target.value === "Teacher" || target.value === "Tutor") {
        account["teacher"] = "NoTeacher";
      } else {
        account["teacher"] = "";
      }
    }

    this.setState({ account, errors });
  };

  render() {
    const { account } = this.state;

    return (
      <div>
        <h1>Register</h1>

        <form onSubmit={this.handleSubmit}>
          <Input
            name="firstname"
            value={account.firstname}
            label="First name"
            type="text"
            onChange={this.handleChange}
            error={this.state.errors.firstname}
          />
          <Input
            name="lastname"
            value={account.lastname}
            label="Last name"
            type="text"
            onChange={this.handleChange}
            error={this.state.errors.lastname}
          />
          <div>Role</div>
          <Select
            name="role"
            value={account.role}
            label="Role"
            type="text"
            onChange={this.handleChange}
            error={this.state.errors.role}
            options={this.state.roleOptions}
          />
          <div>
            {account.role === "Tutor" || account.role === "Teacher" ? (
              <Input
                name="adminPassword"
                value={account.adminPassword}
                label="Teacher/Tutor Password"
                onChange={this.handleChange}
              />
            ) : null}
            <div>Teacher</div>
            {account.role === "Student" ? (
              <Select
                name="teacher"
                value={account.teacher}
                label="Teacher"
                type="text"
                onChange={this.handleChange}
                error={this.state.errors.teacher}
                options={this.state.teacherOptions}
              />
            ) : null}
          </div>

          <Input
            name="email"
            value={account.email}
            label="Email"
            type="email"
            onChange={this.handleChange}
            error={this.state.errors.email}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            type="password"
            onChange={this.handleChange}
            error={this.state.errors.password}
          />

          <button disabled={this.validate()} className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default registerForm;
