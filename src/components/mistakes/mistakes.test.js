import React from "react";
import renderer from "react-test-renderer";
import Mistakes from "./mistakes.jsx";

describe(`GameScreen render correctly`, () => {
  it(`with zero mistakes`, () => {
    const tree = renderer
    .create(
        <Mistakes
          mistakes = {0}
          maxMistakes = {3}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`with on mistake`, () => {
    const tree = renderer
    .create(
        <Mistakes
          mistakes = {1}
          maxMistakes = {3}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
