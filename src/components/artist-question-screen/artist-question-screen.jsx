import React from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const.js";
import AudioPlayer from "../audio-player/audio-player.jsx";

class ArtistQuestionScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
    this.activeChangeHandler = this.activeChangeHandler.bind(this);
  }

  answerHandler(answer) {
    this.props.onAnswer(this.props.question, answer);
  }

  activeChangeHandler() {
    this.setState(
        (prevState) => ({isActive: !prevState.isActive})
    );
  }

  render() {
    const {question} = this.props;
    const {answers, song} = question;
    const isActive = this.state.isActive;

    return (
      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <div className="track">
            <button
              className={`track__button ${isActive ? `track__button--pause` : `track__button--play`}`}
              type="button"
              onClick={this.activeChangeHandler}
            ></button>
            <div className="track__status">
              <AudioPlayer
                src = {song.src}
                isActive = {isActive}
              />
            </div>
          </div>
        </div>

        <form className="game__artist">
          {answers.map((answer, i) => {
            return (
              <div className="artist" key={answer + i}>
                <input className="artist__input visually-hidden" type="radio" name="answer" value={`artist-${i}`} id={`answer-${i}`}
                  onChange={(evt) => {
                    evt.preventDefault();
                    this.answerHandler(answer);
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
    );
  }
}

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
