import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "shared/stores";

import { Box } from "@material-ui/core";

import App from "App";
import LandingPage from "pages/LandingPage";
import LoadingPage from "pages/LoadingPage";

import spotify from "utils/spotify";

export default function Bouncer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const my_tokens = JSON.parse(localStorage.getItem("my_tokens"));
  const [loggedIn, setLoggedIn] = useState(undefined);

  useEffect(() => {
    if (my_tokens && !loggedIn) {
      spotify(my_tokens.access_token)
        .get("me")
        .then((res) => {
          setLoggedIn(true);
          dispatch(actions.setMeAccessToken(my_tokens.access_token));
          dispatch(actions.setMe(res.data));
          dispatch(actions.setCurrentMe(res.data));
        })
        .catch((_) => {
          localStorage.clear();
          history.replace("/");
        });
    }
  }, [dispatch, my_tokens, loggedIn, history]);

  let component;
  if (my_tokens && !loggedIn) {
    component = <LoadingPage />;
  } else if (loggedIn) {
    component = <App />;
  } else {
    component = <LandingPage />;
  }

  return <Box>{component}</Box>;
}
