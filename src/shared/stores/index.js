import { combineReducers } from 'redux';

import {
  reducer as spotifyPlayer,
  actions as spotifyPlayerActions,
  bindSelectors as bindSpotifyPlayerSelectors,
} from './spotifyPlayer';

const appReducer = combineReducers({
  spotifyPlayer,
});

export const actions = {
  ...spotifyPlayerActions,
};

export const selectors = {
  ...bindSpotifyPlayerSelectors((state) => state.spotifyPlayer),
};

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    state = {};
  }

  return appReducer(state, action);
};

export default rootReducer;
