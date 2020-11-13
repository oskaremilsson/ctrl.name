import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "shared/stores";

import api from "utils/api";
import spotify from "utils/spotify";

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
      api.post("getConsents").then((res) => {
        let consentCalls = [];
        let populated_consents = [];
        res.data.Consents.forEach((consent) => {
          consentCalls.push(spotify(accessToken).get(`users/${consent}`));
        });

        Promise.all(consentCalls)
          .then((res) => {
            res.forEach((r) => {
              populated_consents.push(r.data);
            });
            dispatch(actions.setConsents(populated_consents));
          })
          .catch((_) => {
            dispatch(actions.setConsents([]));
          });
      });
    }
  }, [dispatch, consents, accessToken]);

  useEffect(() => {
    if (!myConsents && accessToken) {
      api.post("getMyConsents").then((res) => {
        let consentCalls = [];
        let populated_consents = [];
        res.data.Consents.forEach((consent) => {
          consentCalls.push(spotify(accessToken).get(`users/${consent}`));
        });

        Promise.all(consentCalls)
          .then((res) => {
            res.forEach((r) => {
              populated_consents.push(r.data);
            });
            dispatch(actions.setMyConsents(populated_consents));
          })
          .catch((_) => {
            dispatch(actions.setMyConsents([]));
          });
      });
    }
  }, [dispatch, myConsents, accessToken]);

  useEffect(() => {
    if (!requests && accessToken) {
      api.post("getRequests").then((res) => {
        let requestCalls = [];
        let populated_requests = [];
        res.data.Requests.forEach((request) => {
          requestCalls.push(spotify(accessToken).get(`users/${request}`));
        });

        Promise.all(requestCalls)
          .then((res) => {
            res.forEach((r) => {
              populated_requests.push(r.data);
            });
            dispatch(actions.setRequests(populated_requests));
          })
          .catch((_) => {
            dispatch(actions.setRequests([]));
          });
      });
    }
  }, [dispatch, requests, accessToken]);

  useEffect(() => {
    if (!myRequests && accessToken) {
      api.post("getMyRequests").then((res) => {
        let requestCalls = [];
        let populated_requests = [];
        res.data.Requests.forEach((request) => {
          requestCalls.push(spotify(accessToken).get(`users/${request}`));
        });

        Promise.all(requestCalls)
          .then((res) => {
            res.forEach((r) => {
              populated_requests.push(r.data);
            });
            dispatch(actions.setMyRequests(populated_requests));
          })
          .catch((_) => {
            dispatch(actions.setMyRequests([]));
          });
      });
    }
  }, [dispatch, myRequests, accessToken]);

  return <></>;
}
