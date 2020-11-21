import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "shared/stores";

import { Box } from "@material-ui/core";

import App from "App";
import LandingPage from "pages/LandingPage";
import LoadingPage from "pages/LoadingPage";

import spotify from "utils/spotify";
import api from "utils/api";

const { getMeAccessToken } = selectors;

export default function Bouncer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const refresh_token = localStorage.getItem("refresh_token");
  const accessToken = useSelector((state) => getMeAccessToken(state));
  const [loggedIn, setLoggedIn] = useState(undefined);

  useEffect(() => {
    if (refresh_token && !loggedIn && !accessToken) {
      api
        .post("/getAccessToken")
        .then((res) => {
          dispatch(actions.setMeAccessToken(res?.data?.Access_token));
        })
        .catch((_) => {
          console.log(_);
          localStorage.clear();
          history.replace("/");
        });
    }
  }, [dispatch, refresh_token, loggedIn, history, accessToken]);

  useEffect(() => {
    if (accessToken && !loggedIn) {
      spotify(accessToken)
        .get("me")
        .then((res) => {
          setLoggedIn(true);
          dispatch(actions.setMe(res.data));

          const selectedMe =
            JSON.parse(localStorage.getItem("selected_me")) || res.data;
          dispatch(actions.setCurrentMe(selectedMe));
        })
        .catch((_) => {
          localStorage.clear();
          history.replace("/");
        });
    }
  }, [dispatch, accessToken, loggedIn, history]);

  let component;
  if (refresh_token && !loggedIn) {
    component = <LoadingPage />;
  } else if (loggedIn) {
    component = <App />;
  } else {
    component = <LandingPage />;
  }

  return <Box>{component}</Box>;
}
