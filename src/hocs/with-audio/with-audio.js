import React, {createRef} from "react";
import PropTypes from "prop-types";

const withAudio = (Component) => {
  class WithAudio extends React.PureComponent {
    constructor(props) {
      super(props);
      this._audioRef = createRef();
      this.state = {
        progress: 0,
        isLoading: true,
        isPlaying: props.isPlaying
      };
      this.playButtonClickHandler = this.playButtonClickHandler.bind(this);
    }

    componentDidMount() {
      const {src} = this.props;
      const audio = this._audioRef.current;

      audio.src = src;

      audio.oncanplaythrough = () => this.setState({
        isLoading: false,
      });

      audio.onplay = () => this.setState({
        isPlaying: true,
      });

      audio.onpause = () => this.setState({
        isPlaying: false,
      });

      audio.ontimeupdate = () => this.setState({
        progress: Math.floor(audio.currentTime)
      });
    }

    componentDidUpdate() {
      const audio = this._audioRef.current;

      if (this.props.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    componentWillUnmount() {
      const audio = this._audioRef.current;

      audio.oncanplaythrough = null;
      audio.onplay = null;
      audio.onpause = null;
      audio.ontimeupdate = null;

      audio.src = null;
    }

    playButtonClickHandler() {
      this.setState(
          (prevState) => ({isPlaying: !prevState.isPlaying})
      );
      this.props.onPlayButtonClick();
    }

    render() {
      return (
        <Component
          {...this.props}
          isLoading = {this.state.isLoading}
          onPlayButtonClick = {this.playButtonClickHandler}
        >
          <audio
            ref={this._audioRef}
          />
        </Component>
      );
    }
  }

  WithAudio.propTypes = {
    src: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    onPlayButtonClick: PropTypes.func.isRequired,
  };

  return WithAudio;
};

export default withAudio;
