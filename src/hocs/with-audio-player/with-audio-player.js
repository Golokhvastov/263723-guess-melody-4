import React from "react";
import AudioPlayer from "../../components/audio-player/audio-player.jsx";

export const withAudioPlayer = (Component) => {
  class WithAudioPlayer extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activePlayerId: 0
      };
      this.playButtonClickHandler = this.playButtonClickHandler.bind(this);
    }

    playButtonClickHandler(i) {
      this.setState({
        activePlayerId: this.state.activePlayerId === i ? -1 : i,
      });
    }

    renderPlayer(src, id) {

      return (
        <AudioPlayer
          src = {src}
          isPlaying = {id === this.state.activePlayerId}
          onPlayButtonClick = {() => this.playButtonClickHandler(id)}
        />
      );
    }

    render() {
      return (
        <Component
          {...this.props}
          renderPlayer = {(src, id = 0) => this.renderPlayer(src, id)}
        />
      );
    }
  }

  WithAudioPlayer.propTypes = {};

  return WithAudioPlayer;
};

export default withAudioPlayer;
