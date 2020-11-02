import { combineReducers } from 'redux';

const setMe = (payload) => ({
  type: 'SET_ME',
  payload,
});

const setCurrentMe = (payload) => ({
  type: 'SET_CURRENT_ME',
  payload,
});

export const actions = {
  setMe,
  setCurrentMe,
};

function me(state = {}, action = {}) {
  switch (action.type) {
    case 'SET_ME':
      return action.payload || null;
    default:
      return state;
  }
}

function currentMe(state = {}, action = {}) {
  switch (action.type) {
    case 'SET_CURRENT_ME':
      return action.payload || false;
    default:
      return state;
  }
}

const reducers = combineReducers({
  me,
  currentMe,
});

const initialState = {
  me: null,
  currentMe: null
};

export const reducer = (state = initialState, action = {}) => {
  return reducers(state, action);
};

export const bindSelectors = (slicer) => ({
  getMe: (state) => slicer(state).me || null,
  getCurrentMe: (state) => slicer(state).currentMe || null,
});
