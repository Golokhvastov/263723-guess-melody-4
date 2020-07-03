import React from "react";
import renderer from "react-test-renderer";
import GenreQuestionScreen from "./genre-question-screen.jsx";

const question = {
  type: `genre`,
  genre: `тест1`,
  answers: [
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `тест2`
    },
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `тест3`
    },
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `тест1`
    },
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `тест1`
    }
  ]
};

it(`GenreQuestionScreen render correctly`, () => {
  const tree = renderer
    .create(
        <GenreQuestionScreen
          question = {question}
          onAnswer = {() => {}}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
