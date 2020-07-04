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
  }

  componentDidUpdate() {
    const {audio} = this.state;
    if (this.props.isActive) {
      audio.play();
    } else {
      audio.pause();
    }
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
