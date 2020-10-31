import { combineReducers } from 'redux';

import {
  reducer as spotifyPlayer,
  actions as spotifyPlayerActions,
  bindSelectors as bindSpotifyPlayerSelectors,
} from './spotifyPlayer';

import {
  reducer as consents,
  actions as consentsActions,
  bindSelectors as bindConsentsSelectors,
} from './consents';

const appReducer = combineReducers({
  spotifyPlayer,
  consents,
});

export const actions = {
  ...spotifyPlayerActions,
  ...consentsActions,
};

export const selectors = {
  ...bindSpotifyPlayerSelectors((state) => state.spotifyPlayer),
  ...bindConsentsSelectors((state) => state.consents),
};

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    state = {};
  }

  return appReducer(state, action);
};

export default rootReducer;
