import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";
import { updateExerciseRatings, getStudent } from "../services/studentService";
import { getExerciseRatingAverages } from "../services/userService";
//import { getExercises } from "../services/exerciseService";

class Exercises extends Component {
  state = { exercises: [], ratings: {}, averageRatings: {} };

  async componentDidMount() {
    const exercises = await getExercises();
    this.setState({ exercises });

    const averageRatings = await getExerciseRatingAverages();
    console.log(averageRatings);
    const averages = {};
    averageRatings.map(e => {
      averages[e.shortTitle] = e.average;
    });

    this.setState({ averageRatings: averages });

    if (this.props.user) {
      const user = await getStudent(this.props.user._id);
      this.setState({ user });
      console.log("user", user);

      if (user && user.exerciseRatings) {
        const ratings = user.exerciseRatings;
        this.setState({ ratings });
      } else {
        const ratings = {};
        exercises.map(e => (ratings[e.shortTitle] = 0));
        console.log(ratings);
        this.setState({ ratings });
      }
    }
  }

  async onStarClick(nextValue, prevValue, name) {
    const exercises = [...this.state.exercises];
    const exercise = exercises.find(e => e.shortTitle === name);

    exercise.rating = nextValue;
    const ratings = { ...this.state.ratings };
    ratings[exercise.shortTitle] = nextValue;
    this.setState({ exercises, ratings });

    const user = { ...this.state.user };
    user["exerciseRatings"] = ratings;
    this.setState({ user });
    updateExerciseRatings(this.props.user._id, user);
  }

  render() {
    const { ratings, averageRatings } = this.state;

    return (
      <div>
        <h1>Exercises</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Link</th>
              <th>Average Rating</th>
              <th>Difficulty Rating</th>
            </tr>
          </thead>
          <tbody>
            {this.state.exercises.map((e, index) => (
              <tr key={e.shortTitle}>
                <td>
                  <a href={e.url}>{e.title}</a>
                </td>
                <td>
                  <StarRatingComponent
                    name={e.shortTitle}
                    editing={false}
                    value={averageRatings[e.shortTitle]}
                  />
                </td>
                {this.props.user && (
                  <td>
                    <StarRatingComponent
                      name={e.shortTitle}
                      editing={true}
                      value={ratings[e.shortTitle]}
                      onStarClick={this.onStarClick.bind(this)}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Exercises;
export function getExercises() {
  const exercises = [
    {
      title: "A simple way to tell insects apart",
      shortTitle: "Insects",
      averageRating: 1.4,
      url:
        "https://www.ted.com/talks/anika_hazra_a_simple_way_to_tell_insects_apart?language=en"
    },
    {
      title: "How to spot a counterfeit bill",
      shortTitle: "Counterfeit",
      averageRating: 3,
      url:
        "https://ed.ted.com/lessons/how-to-spot-a-counterfeit-bill-tien-nguyen"
    },
    {
      title: "What is the coldest thing in the world?",
      shortTitle: "Cold",
      averageRating: 5,
      url:
        "https://ed.ted.com/lessons/what-is-the-coldest-thing-in-the-world-lina-marieth-hoyos"
    },
    {
      title: "Not all scientific studies are created equal.",
      shortTitle: "Scientific Studies",
      averageRating: 2,
      url:
        "https://ed.ted.com/lessons/not-all-scientific-studies-are-created-equal-david-h-schwartz#digdeeper"
    }
  ];
  return exercises;
}
