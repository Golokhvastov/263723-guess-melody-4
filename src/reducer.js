import {extend} from "./utils.js";

const ActionType = {
  INCREMENT_STEP: `INCREMENT_STEP`,
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`
};

const initialState = {
  step: -1,
  mistakes: 0
};

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  }),
  incrementMistakes: () => ({
    type: ActionType.INCREMENT_MISTAKES,
    payload: 1,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return extend(state, {
        step: state.step + action.payload
      });
    case ActionType.INCREMENT_MISTAKES:
      return extend(state, {
        mistakes: state.mistakes + action.payload
      });
    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator};
