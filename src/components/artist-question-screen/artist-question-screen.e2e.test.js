import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ArtistQuestionScreen from "./artist-question-screen.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

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
}

it(`e2e test ArtistQuestionScreen`, () => {
  const answerHandler = jest.fn();

  const artistQuestionScreen = shallow(
    <ArtistQuestionScreen
      question = {question}
      onAnswer = {answerHandler}
    />
  );

  artistQuestionScreen.find(`.artist`).at(1).simulate(`click`);

  expect(answerHandler.mock.calls[0][0]).toEqual(question);
  expect(answerHandler.mock.calls[0][1]).toEqual(question.answers[1]);
});
