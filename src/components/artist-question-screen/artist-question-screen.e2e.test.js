import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ArtistQuestionScreen from "./artist-question-screen.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

const mock = {
  question: {
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
};

const mockEvent = {
  preventDefault() {}
};

it(`e2e test ArtistQuestionScreen`, () => {
  const {question} = mock;
  const onAnswer = jest.fn();
  const userAnswer = {
    numberInputClicked: 1,
    resultAnswer: {
      artist: `Бабушки`,
      picture: `https://api.adorable.io/avatars/128`
    }
  };

  const artistQuestionScreen = shallow(
      <ArtistQuestionScreen
        question = {question}
        onAnswer = {onAnswer}
      />
  );

  const answerInputs = artistQuestionScreen.find(`.artist__input`);
  const answerOne = answerInputs.at(userAnswer.numberInputClicked);

  answerOne.simulate(`change`, mockEvent);

  expect(onAnswer.mock.calls[0][0]).toEqual(question);
  expect(onAnswer.mock.calls[0][1]).toEqual(userAnswer.resultAnswer);
});
