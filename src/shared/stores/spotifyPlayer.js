import { combineReducers } from 'redux';

const setSpotifyPlayer = (payload) => ({
  type: 'SET_SPOTIFY_PLAYER',
  payload,
});

const setSpotifyPlayerSync = (payload) => ({
  type: 'SET_SPOTIFY_PLAYER_SYNC',
  payload,
});

export const actions = {
  setSpotifyPlayer,
  setSpotifyPlayerSync,
};

function spotifyPlayer(state = {}, action = {}) {
  switch (action.type) {
    case 'SET_SPOTIFY_PLAYER':
      return action.payload || null;
    default:
      return state;
  }
}

function spotifyPlayerSync(state = {}, action = {}) {
  switch (action.type) {
    case 'SET_SPOTIFY_PLAYER_SYNC':
      return action.payload || false;
    default:
      return state;
  }
}

const reducers = combineReducers({
  spotifyPlayer,
  spotifyPlayerSync,
});

const initialState = {
  spotifyPlayer: null,
  spotifyPlayerSync: false
};

export const reducer = (state = initialState, action = {}) => {
  return reducers(state, action);
};

export const bindSelectors = (slicer) => ({
  getSpotifyPlayer: (state) => slicer(state).spotifyPlayer || null,
  getSpotifyPlayerSync: (state) => slicer(state).spotifyPlayerSync || false,
});
