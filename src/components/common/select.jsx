import React, { Component } from "react";

class Select extends Component {
  render() {
    const { name, value, onChange, options } = this.props;
    return (
      <div>
        <select className="m-3" name={name} value={value} onChange={onChange}>
          {options.map(o => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default Select;
