import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "shared/stores";

import { Box } from "@material-ui/core";

import spotify from "utils/spotify";

const { getCurrentMeAccessToken, getSpotifyPlayerSync } = selectors;

export default function SyncPlayer() {
  const dispatch = useDispatch();
  const playerSync = useSelector((state) => getSpotifyPlayerSync(state));
  const currentMeAccessToken = useSelector((state) =>
    getCurrentMeAccessToken(state)
  );

  const [syncTimer, setSyncTimer] = useState(undefined);

  useEffect(() => {
    if (currentMeAccessToken && playerSync) {
      dispatch(actions.setSpotifyPlayerSync(false));
      spotify(currentMeAccessToken)
        .get("me/player")
        .then((res) => {
          if (res.status === 200 && res?.data?.currently_playing_type === "track") {
            dispatch(actions.setSpotifyPlayer(res.data));
          } else {
            dispatch(actions.setSpotifyPlayer(undefined));
          }
        });
    }

    if (!syncTimer) {
      setSyncTimer(
        setInterval(() => {
          dispatch(actions.setSpotifyPlayerSync(true));
        }, process.env.REACT_APP_SPOTIFY_PING_INTERVAL || 30000)
      );
    }
  }, [dispatch, playerSync, currentMeAccessToken, syncTimer]);

  return <Box></Box>;
}
