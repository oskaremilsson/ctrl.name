import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "shared/stores";

import spotify from "utils/spotify";

const { getCurrentMeAccessToken, getSpotifyPlayerSync } = selectors;

export default function SyncPlayer() {
  const dispatch = useDispatch();
  const playerSync = useSelector((state) => getSpotifyPlayerSync(state));
  const currentMeAccessToken = useSelector((state) =>
    getCurrentMeAccessToken(state)
  );

  useEffect(() => {
    if (currentMeAccessToken && playerSync) {
      dispatch(actions.setSpotifyPlayerSync(false));
      spotify(currentMeAccessToken)
        .get("me/player")
        .then((res) => {
          if (
            res.status === 200 &&
            res?.data?.currently_playing_type === "track"
          ) {
            dispatch(actions.setSpotifyPlayer(res.data));
          } else {
            dispatch(actions.setSpotifyPlayer(undefined));
          }
        });
    }
  }, [dispatch, playerSync, currentMeAccessToken]);

  return <></>;
}
