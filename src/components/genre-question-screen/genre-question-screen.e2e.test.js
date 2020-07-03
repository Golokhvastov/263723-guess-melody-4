import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GenreQuestionScreen from "./genre-question-screen.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

const mock = {
  question: {
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
};

it(`e2e test GenreQuestionScreen`, () => {
  const {question} = mock;
  const onAnswer = jest.fn();
  const userAnswer = {
    indexInputForCheck: 1,
    resultAnswer: [false, true, false, false],
  };

  const genreQuestionScreen = shallow(
      <GenreQuestionScreen
        question = {question}
        onAnswer = {onAnswer}
      />
  );

  const inputs = genreQuestionScreen.find(`.game__input`);
  const inputForCheck = inputs.at(userAnswer.indexInputForCheck);
  inputForCheck.simulate(`change`, {target: {checked: true}});


  const form = genreQuestionScreen.find(`form`);
  const formSendPrevention = jest.fn();
  form.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  // expect(onAnswer.mock.calls.length).toBe(1);
  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);

  expect(onAnswer.mock.calls[0][0]).toEqual(question);
  expect(onAnswer.mock.calls[0][1]).toEqual(userAnswer.resultAnswer);

  expect(
      genreQuestionScreen.find(`input`).map((it) => it.prop(`checked`))
  ).toEqual(userAnswer.resultAnswer);
});
