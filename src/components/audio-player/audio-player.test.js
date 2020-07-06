import React from "react";
import renderer from "react-test-renderer";
import AudioPlayer from "./audio-player.jsx";

const mock = {
  src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  isPlaying: true,
};

it(`AudioPlayer render correctly`, () => {
  const tree = renderer
    .create(
        <AudioPlayer
          src = {mock.src}
          isPlaying = {mock.isPlaying}
          onPlayButtonClick = {() => {}}
        />, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
