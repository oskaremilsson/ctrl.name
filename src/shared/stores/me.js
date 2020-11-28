import { combineReducers } from "redux";

const setMe = (payload) => ({
  type: "SET_ME",
  payload,
});

const setMeAccessToken = (payload) => ({
  type: "SET_ME_ACCESS_TOKEN",
  payload,
});

const logout = () => ({
  type: "LOGOUT",
});

const logoutWithoutReload = () => ({
  type: "LOGOUT_WITHOUT_RELOAD",
});

export const actions = {
  setMe,
  setMeAccessToken,
  logout,
  logoutWithoutReload,
};

function me(state = {}, action = {}) {
  switch (action.type) {
    case "SET_ME":
      return action.payload || null;
    default:
      return state;
  }
}

function meAccessToken(state = {}, action = {}) {
  switch (action.type) {
    case "SET_ME_ACCESS_TOKEN":
      return action.payload || null;
    default:
      return state;
  }
}

const reducers = combineReducers({
  me,
  meAccessToken,
});

const initialState = {
  me: null,
  meAccessToken: null,
};

export const reducer = (state = initialState, action = {}) => {
  return reducers(state, action);
};

export const bindSelectors = (slicer) => ({
  getMe: (state) => slicer(state).me || null,
  getMeAccessToken: (state) => slicer(state).meAccessToken || null,
});
