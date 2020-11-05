import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions } from 'shared/stores';

import api from 'utils/api';
import spotify from 'utils/spotify';

const {
  getMeAccessToken,
  getConsents,
  getMyConsents,
  getRequests,
  getMyRequests,
} = selectors;

export default function FetchConsents() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => getMeAccessToken(state));
  const consents = useSelector((state) => getConsents(state));
  const myConsents = useSelector((state) => getMyConsents(state));
  const requests = useSelector((state) => getRequests(state));
  const myRequests = useSelector((state) => getMyRequests(state));

  useEffect(() => {
    if (!consents && accessToken) {
      api.post('getConsents')
      .then(res => {
        let consentCalls = [];
        let populated_consents = [];
        res.data.Consents.forEach((consent) => {
          consentCalls.push(spotify(accessToken).get(`users/${consent}`));
        });

        Promise.all(consentCalls).then((res) => {
          res.forEach((r) => {
            populated_consents.push(r.data);
          });
          dispatch(actions.setConsents(populated_consents));
        });
        
      });
    }
  }, [dispatch, consents, accessToken]);

  useEffect(() => {
    if (!myConsents) {
      api.post('getMyConsents')
      .then(res => {
        dispatch(actions.setMyConsents(res.data && res.data.Consents));
      });
    }
  }, [dispatch, myConsents]);

  useEffect(() => {
    if (!requests) {
      api.post('getRequests')
      .then(res => {
        dispatch(actions.setRequests(res.data && res.data.Requests));
      });
    }
  }, [dispatch, requests]);

  useEffect(() => {
    if (!myRequests) {
      api.post('getMyRequests')
      .then(res => {
        dispatch(actions.setMyRequests(res.data && res.data.Requests));
      });
    }
  }, [dispatch, myRequests]);

  return (
    <></>
  );
}
