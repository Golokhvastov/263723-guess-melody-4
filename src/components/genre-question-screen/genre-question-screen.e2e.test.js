import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GenreQuestionScreen from "./genre-question-screen.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

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
}

it(`e2e test GenreQuestionScreen`, () => {
  const answerHandler = jest.fn();

  const genreQuestionScreen = shallow(
    <GenreQuestionScreen
      question = {question}
      onAnswer = {answerHandler}
    />
  );

  // const inputs = genreQuestionScreen.find(`.game__input`)
  // inputs.at(1).simulate('change', { target: { checked: true } });
  // inputs.at(2).simulate('change', { target: { checked: true } });

  genreQuestionScreen.find(`.game__submit`).simulate(`click`);

  expect(answerHandler.mock.calls.length).toBe(1);
  // expect(answerHandler.mock.calls[0][0]).toEqual(question);
  // expect(answerHandler.mock.calls[0][1]).toEqual(question.answers[1]);
});
