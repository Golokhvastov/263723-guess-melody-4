import React from "react";
import PropTypes from "prop-types";

const AudioPlayer = (props) => {
  const {isLoading, isPlaying, onPlayButtonClick, children} = props;

  return (
    <>
      <button
        className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
        type="button"
        disabled={isLoading}
        onClick={onPlayButtonClick}
      ></button>
      <div className="track__status">
        {children}
      </div>
    </>
  );
};

export default AudioPlayer;

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};
