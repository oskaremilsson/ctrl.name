import { combineReducers } from 'redux';

import {
  reducer as me,
  actions as meActions,
  bindSelectors as bindMeSelectors,
} from './me';

import {
  reducer as currentMe,
  actions as currentMeActions,
  bindSelectors as bindCurrentMeSelectors,
} from './currentMe';

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
  me,
  currentMe,
  spotifyPlayer,
  consents,
});

export const actions = {
  ...meActions,
  ...currentMeActions,
  ...spotifyPlayerActions,
  ...consentsActions,
};

export const selectors = {
  ...bindMeSelectors((state) => state.me),
  ...bindCurrentMeSelectors((state) => state.currentMe),
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
