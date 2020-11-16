import { combineReducers } from "redux";

import {
  reducer as me,
  actions as meActions,
  bindSelectors as bindMeSelectors,
} from "./me";

import {
  reducer as currentMe,
  actions as currentMeActions,
  bindSelectors as bindCurrentMeSelectors,
} from "./currentMe";

import {
  reducer as spotifyPlayer,
  actions as spotifyPlayerActions,
  bindSelectors as bindSpotifyPlayerSelectors,
} from "./spotifyPlayer";

import {
  reducer as playlists,
  actions as playlistsActions,
  bindSelectors as bindPlaylistsSelectors,
} from "./playlists";

import {
  reducer as consents,
  actions as consentsActions,
  bindSelectors as bindConsentsSelectors,
} from "./consents";

const appReducer = combineReducers({
  me,
  currentMe,
  spotifyPlayer,
  playlists,
  consents,
});

export const actions = {
  ...meActions,
  ...currentMeActions,
  ...spotifyPlayerActions,
  ...playlistsActions,
  ...consentsActions,
};

export const selectors = {
  ...bindMeSelectors((state) => state.me),
  ...bindCurrentMeSelectors((state) => state.currentMe),
  ...bindSpotifyPlayerSelectors((state) => state.spotifyPlayer),
  ...bindPlaylistsSelectors((state) => state.playlists),
  ...bindConsentsSelectors((state) => state.consents),
};

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = {};
  }

  return appReducer(state, action);
};

export default rootReducer;
