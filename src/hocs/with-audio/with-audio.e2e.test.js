import React from "react";
import PropTypes from "prop-types";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withAudio from "./with-audio.js";

Enzyme.configure({
  adapter: new Adapter()
});

const MockComponent = (props) => {
  const {children, onPlayButtonClick} = props;

  return (
    <div>
      <button onClick={onPlayButtonClick} />
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  onPlayButtonClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

const MockComponentWrapper = withAudio(MockComponent);

it(`e2e test for withAudio`, () => {
  const onPlayButtonClick = jest.fn();
  window.HTMLMediaElement.prototype.play = jest.fn();

  const wrapper = mount(
      <MockComponentWrapper
        src = "src"
        isPlaying = {true}
        onPlayButtonClick = {onPlayButtonClick}
      />
  );

  const {_audioRef} = wrapper.instance();
  wrapper.instance().componentDidUpdate();
  expect(_audioRef.current.play).toHaveBeenCalledTimes(1);
});
