import React, { Component } from "react";
import Input from "../components/common/input";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";

class loginForm extends Component {
  state = { account: { email: "", password: "" }, errors: {} };

  schema = {
    email: Joi.string()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password")
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

    this.setState({ errors: errors || {} });
    if (errors) return;

    try {
      await auth.login(this.state.account);
      const { state } = this.props.location;
      console.log(state.from.pathname);
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
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
    this.setState({ account, errors });
    console.log("Errors", this.state.errors);
  };

  render() {
    const { account } = this.state;

    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="email"
            value={account.email}
            label="Email"
            type="text"
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
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default loginForm;
