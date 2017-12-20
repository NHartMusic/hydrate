import {
  RECEIVE_FREQUENCY,
  CLEAR_FREQUENCY
} from '../actions/frequency_actions';
import merge from 'lodash/merge';

const initialState = {};

const FrequencyReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState;

  switch (action.type) {
    case RECEIVE_FREQUENCY:
      const freq = action.frequency;
      return freq;
    case CLEAR_FREQUENCY:
      return null;
    default:
      return state;
  }
};

export default FrequencyReducer;
