import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions } from 'shared/stores';

import api from 'utils/api';

const {
  getConsents,
  getMyConsents,
  getRequests,
  getMyRequests,
} = selectors;

export default function FetchConsents() {
  const dispatch = useDispatch();
  const consents = useSelector((state) => getConsents(state));
  const myConsents = useSelector((state) => getMyConsents(state));
  const requests = useSelector((state) => getRequests(state));
  const myRequests = useSelector((state) => getMyRequests(state));

  useEffect(() => {
    if (!consents) {
      api.post('getConsents')
      .then(res => {
        dispatch(actions.setConsents(res.data && res.data.Consents));
      });
    }
  }, [dispatch, consents]);

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
