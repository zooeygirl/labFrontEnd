import React, { Component } from "react";
import { Popup } from "semantic-ui-react";

import ExerciseCompletionForm from "./../exerciseCompletionForm";

class PopupExample extends Component {
  state = { isOpen: false };

  handleOpen = () => {
    this.setState({ isOpen: true });
    this.timeout = setTimeout(() => {
      this.setState({ isOpen: false });
    }, 3000);
  };

  render() {
    return (
      <Popup
        style={{
          background: "white"
        }}
        content={
          <ExerciseCompletionForm
            student={this.props.student}
            onClick={this.props.onClick}
          />
        }
        trigger={
          !this.props.completed && this.props.userStatus ? (
            <span>{this.props.title}</span>
          ) : null
        }
        on="click"
        open={this.state.isOpen}
        onOpen={this.handleOpen}
      />
    );
  }
}

export default PopupExample;
