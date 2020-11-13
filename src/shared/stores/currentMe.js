import { combineReducers } from "redux";

const setCurrentMe = (payload) => ({
  type: "SET_CURRENT_ME",
  payload,
});

const setCurrentMeAccessToken = (payload) => ({
  type: "SET_CURRENT_ME_ACCESS_TOKEN",
  payload,
});

export const actions = {
  setCurrentMe,
  setCurrentMeAccessToken,
};

function currentMe(state = {}, action = {}) {
  switch (action.type) {
    case "SET_CURRENT_ME":
      return action.payload || false;
    default:
      return state;
  }
}

function currentMeAccessToken(state = {}, action = {}) {
  switch (action.type) {
    case "SET_CURRENT_ME_ACCESS_TOKEN":
      return action.payload || false;
    default:
      return state;
  }
}

const reducers = combineReducers({
  currentMe,
  currentMeAccessToken,
});

const initialState = {
  currentMe: null,
  currentMeAccessToken: null,
};

export const reducer = (state = initialState, action = {}) => {
  return reducers(state, action);
};

export const bindSelectors = (slicer) => ({
  getCurrentMe: (state) => slicer(state).currentMe || null,
  getCurrentMeAccessToken: (state) =>
    slicer(state).currentMeAccessToken || null,
});
