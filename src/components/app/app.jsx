import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import GameScreen from "../game-screen/game-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import {GameType} from "../../const.js";
import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player.js";
import {ActionCreator} from "../../reducer.js";


const ArtistQuestionScreenWrapper = withAudioPlayer(ArtistQuestionScreen);
const GenreQuestionScreenWrapper = withAudioPlayer(GenreQuestionScreen);

class App extends React.PureComponent {
  _renderGameScreen() {
    const {errorsCount, questions, onWelcomeButtonClick, onUserAnswer, step} = this.props;

    if (step < 0 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount = {errorsCount}
          onWelcomeButtonClick = {onWelcomeButtonClick}
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
                onAnswer = {onUserAnswer}
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
                onAnswer = {onUserAnswer}
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
              onAnswer = {() => {}}
            />
          </Route>
          <Route exact path="/dev-genre">
            <GenreQuestionScreenWrapper
              question = {questions[1]}
              onAnswer = {() => {}}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    step: state.step
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onWelcomeButtonClick: () => {
      dispatch(ActionCreator.incrementStep());
    },
    onUserAnswer: () => {
      dispatch(ActionCreator.incrementStep());
      dispatch(ActionCreator.incrementMistakes());
    }
  };
};

export {App};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(
      PropTypes.object
  ).isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};
