import React from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const.js";
import AudioPlayer from "../audio-player/audio-player.jsx";

const ArtistQuestionScreen = (props) => {
  const {question, onAnswer} = props;
  const {answers, song} = question;

  const answerHandler = (answer) => {
    onAnswer(question, answer);
  };

  return (
    <section className="game game--artist">
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
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <div className="track">
            <AudioPlayer
              src = {song.src}
            />
          </div>
        </div>

        <form className="game__artist">
          {answers.map((answer, i) => {
            return (
              <div className="artist" key={answer + i}>
                <input className="artist__input visually-hidden" type="radio" name="answer" value={`artist-${i}`} id={`answer-${i}`}
                  onChange={(evt) => {
                    evt.preventDefault();
                    answerHandler(answer);
                  }}
                ></input>
                <label className="artist__name" htmlFor={`answer-${i}`}>
                  <img className="artist__picture" src={answer.picture} alt={answer.artist}></img>
                  {answer.artist}
                </label>
              </div>
            );
          })}
        </form>
      </section>
    </section>
  );
};

export default ArtistQuestionScreen;

ArtistQuestionScreen.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired
    }).isRequired,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
          artist: PropTypes.string.isRequired,
          picture: PropTypes.string.isRequired
        })
    ).isRequired
  }).isRequired,
  onAnswer: PropTypes.func.isRequired
};
