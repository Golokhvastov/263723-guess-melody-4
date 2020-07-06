import {extend} from "./utils.js";
import {GameType} from "./const.js";
import questions from "./mocks/questions.js";

const ActionType = {
  INCREMENT_STEP: `INCREMENT_STEP`,
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`
};

const initialState = {
  step: -1,
  mistakes: 0,
  maxMistakes: 3,
  questions,
};

const isArtistAnswerCorrect = (question, userAnswer) => {
  return userAnswer.artist === question.song.artist;
};

const isGenreAnswerCorrect = (question, userAnswer) => {
  for (let i = 0; i < userAnswer.length; i++) {
    const correctAnswer = question.answers[i].genre === question.genre;
    if (userAnswer[i] !== correctAnswer) {
      return false;
    }
  }
  return true;
};

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  }),
  incrementMistakes: (question, userAnswer) => {
    let answerIsCorrect = false;

    switch (question.type) {
      case GameType.ARTIST:
        answerIsCorrect = isArtistAnswerCorrect(question, userAnswer);
        break;
      case GameType.GENRE:
        answerIsCorrect = isGenreAnswerCorrect(question, userAnswer);
        break;
    }

    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: answerIsCorrect ? 0 : 1,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      const nextStep = state.step + action.payload;

      if (nextStep >= state.questions.length) {
        return extend({},
            initialState
        );
      }

      return extend(state, {
        step: nextStep
      });
    case ActionType.INCREMENT_MISTAKES:
      const nextMistakes = state.mistakes + action.payload;

      if (nextMistakes >= state.maxMistakes) {
        return extend({},
            initialState
        );
      }

      return extend(state, {
        mistakes: nextMistakes
      });
    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator};
