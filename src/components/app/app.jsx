import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import GameScreen from "../game-screen/game-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import {GameType} from "../../const.js";
import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player.js";

const ArtistQuestionScreenWrapper = withAudioPlayer(ArtistQuestionScreen);
const GenreQuestionScreenWrapper = withAudioPlayer(GenreQuestionScreen);

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
    } else {
      const question = questions[step];

      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen
              type={question.type}
            >
              <ArtistQuestionScreenWrapper
                question = {question}
                onAnswer = {this.answerHandler}
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen
              type={question.type}
            >
              <GenreQuestionScreenWrapper
                question = {question}
                onAnswer = {this.answerHandler}
              />
            </GameScreen>
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
            <ArtistQuestionScreenWrapper
              question = {questions[0]}
              onAnswer = {this.answerHandler}
            />
          </Route>
          <Route exact path="/dev-genre">
            <GenreQuestionScreenWrapper
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
