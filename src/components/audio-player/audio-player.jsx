import React from "react";
import PropTypes from "prop-types";

class AudioPlayer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      audio: new Audio()
    };
    this.playerClickHandler = this.playerClickHandler.bind(this);
  }

  playerClickHandler() {
    const {audio} = this.state;
    this.state.isActive ? audio.pause() : audio.play();
    this.setState(
      (prevState) => ({isActive: !prevState.isActive})
    );
  }

  componentDidMount() {
    this.state.audio.src = this.props.src;
  }

  render() {
    return (
      <>
        <button
          className={`track__button ${this.state.isActive ? `track__button--pause` : `track__button--play`}`}
          type="button"
          onClick={this.playerClickHandler}
        ></button>
        <div className="track__status">
          <audio></audio>
        </div>
      </>
    );
  }
}

export default AudioPlayer;

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired
};
