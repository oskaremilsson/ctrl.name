import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "shared/stores";

import NavBar from "shared/components/NavBar";

import Home from "pages/Home";
import Profile from "pages/Profile";
import Playlists from "pages/Playlists";
import Search from "pages/Search";

import FetchConsents from "./components/FetchConsents";

import { Box } from "@material-ui/core";

import api from "utils/api";

const { getCurrentMe, getCurrentMeAccessToken } = selectors;

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const currentMe = useSelector((state) => getCurrentMe(state));
  const currentMeAccessToken = useSelector((state) =>
    getCurrentMeAccessToken(state)
  );

  useEffect(() => {
    if (!currentMeAccessToken && currentMe) {
      let data = new FormData();
      data.append("username", currentMe.id);

      api
        .post("getAccessToken", data)
        .then((res) => {
          dispatch(actions.setCurrentMeAccessToken(res.data.Access_token));
          dispatch(actions.setSpotifyPlayerSync(true));
        })
        .catch((_) => {
          dispatch(actions.logout());
          localStorage.clear();
          history.replace("/");
          window.location.reload();
        });
    }
  }, [dispatch, history, currentMe, currentMeAccessToken]);

  let component;
  switch (location && location.pathname) {
    case "/profile":
      component = <Profile />;
      break;
    case "/playlists":
      component = <Playlists />;
      break;
    case "/search":
      component = <Search />;
      break;
    default:
      component = <Home />;
      break;
  }

  return (
    <Box marginBottom={7}>
      {component}

      <Box position="fixed" bottom={0} width="100%" zIndex={2}>
        <NavBar />
      </Box>
      <FetchConsents />
    </Box>
  );
}
