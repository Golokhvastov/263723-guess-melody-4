import React from "react";
import renderer from "react-test-renderer";
import ArtistQuestionScreen from "./artist-question-screen.jsx";

const question = {
  type: `artist`,
  song: {
    artist: `Тест1`,
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  },
  answers: [
    {
      artist: `Тест2`,
      picture: `https://api.adorable.io/avatars/128`
    },
    {
      artist: `Бабушки`,
      picture: `https://api.adorable.io/avatars/128`
    },
    {
      artist: `Тест1`,
      picture: `https://api.adorable.io/avatars/128`
    }
  ]
};

it(`ArtistQuestionScreen render correctly`, () => {
  const tree = renderer
    .create(
        <ArtistQuestionScreen
          question = {question}
          onAnswer = {() => {}}
          renderPlayer = {() => {}}
        />, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
