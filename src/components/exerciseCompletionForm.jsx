import React, { Component } from "react";
import { getExercises } from "./exercises";

class ExerciseCompletionForm extends Component {
  state = { exercises: [] };

  async componentDidMount() {
    this.state.exercises = await getExercises();
  }

  render({ exercises } = this.state, { student } = this.props) {
    return (
      <div>
        {exercises.map((e, index) => (
          <div key={index}>
            {student.completed.indexOf(index) === -1 ? (
              <label>
                <input
                  style={{ margin: 2 }}
                  onClick={() => this.props.onClick({ student }, { index })}
                  type="radio"
                  value={index}
                  name="chooseExercise"
                />
                {e.title}
              </label>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
}

export default ExerciseCompletionForm;
