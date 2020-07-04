import React from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const.js";
import AudioPlayer from "../audio-player/audio-player.jsx";

class GenreQuestionScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      answers: [false, false, false, false],
      activePlayerIndex: -1
    };
    this.activeChangeHandler = this.activeChangeHandler.bind(this);
  }

  answerHandler() {
    const {question, onAnswer} = this.props;

    onAnswer(question, this.state.answers);
  }

  activeChangeHandler(index) {
    if (index === this.state.activePlayerIndex) {
      this.setState({
        activePlayerIndex: -1,
      });
    } else {
      this.setState({
        activePlayerIndex: index,
      });
    }
  }

  render() {
    const {question} = this.props;
    const {answers: userAnswers} = this.state;
    const {answers} = question;

    return (
      <section className="game game--genre">
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"></img>
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx="390" cy="390" r="370"
              style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}} />
          </svg>

          <div className="game__mistakes">
            <div className="wrong"></div>
            <div className="wrong"></div>
            <div className="wrong"></div>
          </div>
        </header>

        <section className="game__screen">
          <h2 className="game__title">Выберите инди-рок треки</h2>
          <form
            className="game__tracks"
            onSubmit={(evt) => {
              evt.preventDefault();
              this.answerHandler();
            }}
          >
            {answers.map((answer, i) => {
              const isActive = i === this.state.activePlayerIndex ? true : false;

              return (
                <div className="track" key={answer.src + i}>
                  <button
                    className={`track__button ${isActive ? `track__button--pause` : `track__button--play`}`}
                    type="button"
                    onClick={() => this.activeChangeHandler(i)}
                  ></button>
                  <div className="track__status">
                    <AudioPlayer
                      src = {answer.src}
                      isActive = {isActive}
                    />
                  </div>
                  <div className="game__answer">
                    <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${i}`}
                      id={`answer-${i}`}
                      checked={userAnswers[i]}
                      onChange={(evt) => {
                        const value = evt.target.checked;

                        this.setState({
                          answers: [...userAnswers.slice(0, i), value, ...userAnswers.slice(i + 1)],
                        });
                      }}
                    />
                    <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
                  </div>
                </div>
              );
            })}

            <button className="game__submit button" type="submit">Ответить</button>
          </form>
        </section>
      </section>
    );
  }
}

export default GenreQuestionScreen;

GenreQuestionScreen.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
    genre: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          genre: PropTypes.string.isRequired
        })
    ).isRequired
  }).isRequired,
  onAnswer: PropTypes.func.isRequired
};
