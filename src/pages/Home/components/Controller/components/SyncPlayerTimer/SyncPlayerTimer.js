import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions } from "shared/stores";

import { Box } from "@material-ui/core";

export default function SyncPlayer() {
  const dispatch = useDispatch();

  const [syncTimer, setSyncTimer] = useState(undefined);

  useEffect(() => {
    if (!syncTimer) {
      dispatch(actions.setSpotifyPlayerSync(true));
      setSyncTimer(
        setInterval(() => {
          dispatch(actions.setSpotifyPlayerSync(true));
        }, process.env.REACT_APP_SPOTIFY_PING_INTERVAL || 30000)
      );
    }

    return () => {
      clearInterval(syncTimer);
    };
  }, [dispatch, syncTimer]);

  return <Box></Box>;
}
