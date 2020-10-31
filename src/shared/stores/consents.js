import { combineReducers } from 'redux';

const setConsents = (payload) => ({
  type: 'SET_CONSENTS',
  payload,
});

const setConsentRequests = (payload) => ({
  type: 'SET_CONSENT_REQUESTS',
  payload,
});

export const actions = {
  setConsents,
  setConsentRequests,
};

function consents(state = {}, action = {}) {
  switch (action.type) {
    case 'SET_CONSENTS':
      return action.payload || null;
    default:
      return state;
  }
}

function consentRequests(state = {}, action = {}) {
  switch (action.type) {
    case 'SET_CONSENT_REQUESTS':
      return action.payload || false;
    default:
      return state;
  }
}

const reducers = combineReducers({
  consents,
  consentRequests,
});

const initialState = {
  consents: null,
  consentRequests: false
};

export const reducer = (state = initialState, action = {}) => {
  return reducers(state, action);
};

export const bindSelectors = (slicer) => ({
  getConsents: (state) => slicer(state).consents || null,
  getConsentRequests: (state) => slicer(state).consentRequests || false,
});
