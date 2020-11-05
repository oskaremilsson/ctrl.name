import { combineReducers } from 'redux';

const setConsents = (payload) => ({
  type: 'SET_CONSENTS',
  payload,
});

const setMyConsents = (payload) => ({
  type: 'SET_MY_CONSENTS',
  payload,
});

const setRequests = (payload) => ({
  type: 'SET_REQUESTS',
  payload,
});

const setMyRequests = (payload) => ({
  type: 'SET_MY_REQUESTS',
  payload,
});

export const actions = {
  setConsents,
  setMyConsents,
  setRequests,
  setMyRequests,
};

function consents(state = {}, action = {}) {
  switch (action.type) {
    case 'SET_CONSENTS':
      return action.payload || null;
    default:
      return state;
  }
}

function myConsents(state = {}, action = {}) {
  switch (action.type) {
    case 'SET_MY_CONSENTS':
      return action.payload || null;
    default:
      return state;
  }
}

function requests(state = {}, action = {}) {
  switch (action.type) {
    case 'SET_REQUESTS':
      return action.payload || false;
    default:
      return state;
  }
}

function myRequests(state = {}, action = {}) {
  switch (action.type) {
    case 'SET_MY_REQUESTS':
      return action.payload || null;
    default:
      return state;
  }
}

const reducers = combineReducers({
  consents,
  myConsents,
  requests,
  myRequests,
});

const initialState = {
  consents: null,
  myConsents: null,
  requests: null,
  myRequests: null,
};

export const reducer = (state = initialState, action = {}) => {
  return reducers(state, action);
};

export const bindSelectors = (slicer) => ({
  getConsents: (state) => slicer(state).consents || null,
  getMyConsents: (state) => slicer(state).myConsents || null,
  getRequests: (state) => slicer(state).requests || null,
  getMyRequests: (state) => slicer(state).myRequests || null,
});
