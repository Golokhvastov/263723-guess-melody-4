import React from "react";
import renderer from "react-test-renderer";
import AudioPlayer from "./audio-player.jsx";

const mock = {
  src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  isActive: true,
};

it(`AudioPlayer render correctly`, () => {
  const tree = renderer
    .create(
        <AudioPlayer
          src = {mock.src}
          isActive = {mock.isActive}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
