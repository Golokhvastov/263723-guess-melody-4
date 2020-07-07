import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withUserAnswers from "./with-user-answers.js";

Enzyme.configure({
  adapter: new Adapter()
});

const MockComponent = () => <div />;
const MockComponentWrapper = withUserAnswers(MockComponent);

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

it(`e2e test withUserAnswers`, () => {
  const {question} = mock;
  const onAnswer = jest.fn();
  const userAnswer = {
    startAnswers: [false, false, false, false],
    newTrueAnswersId: [1, 2],
    result: [false, true, true, false],
    newFalseAnswersId: 1,
    result2: [false, false, true, false],
  };

  const wrapper = shallow(
      <MockComponentWrapper
        question = {question}
        onAnswer = {onAnswer}
      />
  );

  wrapper.props().onAnswer();
  expect(onAnswer.mock.calls[0][1]).toEqual(userAnswer.startAnswers);

  wrapper.props().onAnswerChange(true, userAnswer.newTrueAnswersId[0]);
  wrapper.props().onAnswerChange(true, userAnswer.newTrueAnswersId[1]);
  wrapper.props().onAnswer();
  expect(onAnswer.mock.calls[1][1]).toEqual(userAnswer.result);

  wrapper.props().onAnswerChange(false, userAnswer.newFalseAnswersId);
  wrapper.props().onAnswer();
  expect(onAnswer.mock.calls[2][1]).toEqual(userAnswer.result2);
});
