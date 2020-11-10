import { combineReducers } from 'redux';

const setPlaylists = (payload) => ({
  type: 'SET_PLAYLISTS',
  payload,
});

export const actions = {
  setPlaylists,
};

function playlists(state = {}, action = {}) {
  switch (action.type) {
    case 'SET_PLAYLISTS':
      return action.payload || {};
    default:
      return state;
  }
}

const reducers = combineReducers({
  playlists,
});

const initialState = {
  playlists: {},
};

export const reducer = (state = initialState, action = {}) => {
  return reducers(state, action);
};

export const bindSelectors = (slicer) => ({
  getPlaylists: (state) => slicer(state).playlists || {},
});
