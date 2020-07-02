import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";


class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      step: -1,
    };
    this.welcomeButtonClickHandler = this.welcomeButtonClickHandler.bind(this);
    this.answerHandler = this.answerHandler.bind(this);
  }

  welcomeButtonClickHandler() {
    this.setState({step: 0});
  }

  answerHandler() {
    this.setState(
      (prevState) => ({step: prevState.step + 1})
    );
  }

  render() {
    const {errorsCount, questions} = this.props;
    const {step} = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {
              (step === -1)
                ? <WelcomeScreen
                  errorsCount = {errorsCount}
                  onWelcomeButtonClick = {this.welcomeButtonClickHandler}
                />
                :
              (0 <= step && step < questions.length && questions[step].type === `artist`)
                ? <ArtistQuestionScreen
                  question = {questions[step]}
                  onAnswer = {this.answerHandler}
                />
                :
              (0 <= step && step < questions.length && questions[step].type === `genre`)
                ? <GenreQuestionScreen
                  question = {questions[step]}
                  onAnswer = {this.answerHandler}
                />
                :
              (step >= questions.length)
                ? this.setState({step: -1})
                : null
            }
          </Route>
          <Route exact path="/dev-artist">
            <ArtistQuestionScreen
              question = {questions[0]}
              onAnswer = {this.answerHandler}
            />
          </Route>
          <Route exact path="/dev-genre">
            <GenreQuestionScreen
              question = {questions[1]}
              onAnswer = {this.answerHandler}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
};

export default App;

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(
      PropTypes.object
  ).isRequired
};
