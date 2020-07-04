import React from "react";
import PropTypes from "prop-types";

class AudioPlayer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      audio: new Audio()
    };
  }

  componentDidMount() {
    const {audio} = this.state;
    audio.src = this.props.src;

    this.props.isActive ? audio.play() : audio.pause();
  }

  componentDidUpdate() {
    const {audio} = this.state;
    this.props.isActive ? audio.play() : audio.pause();
  }

  componentWillUnmount() {
    const {audio} = this.state;
    audio.pause();
    audio.src = null;
    this.setState({audio: null});
  }

  render() {
    return (
      <audio></audio>
    );
  }
}

export default AudioPlayer;

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired
};
