import React from "react";
import renderer from "react-test-renderer";
import WelcomeScreen from "./welcome-screen.jsx";

it(`WelcomeScreen render correctly`, () => {
  const tree = renderer
    .create(<WelcomeScreen
      maxMistakes = {3}
      onWelcomeButtonClick = {() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
