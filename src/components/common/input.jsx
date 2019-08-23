import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group ml-3 mr-3">
      <label htmlFor={name}>{label}</label>
      <input {...rest} id={name} name={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
