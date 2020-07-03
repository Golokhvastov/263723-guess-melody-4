import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";

const GameType = {
  ARTIST: `artist`,
  GENRE: `genre`,
};

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
    this.setState({
      step: 0
    });
  }

  answerHandler() {
    this.setState((prevState) => ({
      step: prevState.step + 1
    }));
  }

  _renderGameScreen() {
    const {errorsCount, questions} = this.props;
    const {step} = this.state;

    if (step < 0 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount = {errorsCount}
          onWelcomeButtonClick = {this.welcomeButtonClickHandler}
        />
      );
    } else if (questions[step]) {
      switch (questions[step].type) {
        case GameType.ARTIST:
          return (
            <ArtistQuestionScreen
               question = {questions[step]}
               onAnswer = {this.answerHandler}
            />
          );
        case GameType.GENRE:
          return (
            <GenreQuestionScreen
              question = {questions[step]}
              onAnswer = {this.answerHandler}
            />
          );
      }
    }

    return null;
  }

  render() {
    const {questions} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
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
}

export default App;

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(
      PropTypes.object
  ).isRequired
};
