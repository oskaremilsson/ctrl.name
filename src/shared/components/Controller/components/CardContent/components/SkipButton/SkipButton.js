import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "shared/stores";

import spotify from "utils/spotify";
import { SkipNext, SkipPrevious, FiberManualRecord } from "@material-ui/icons";
import { makeStyles, IconButton } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  disabled: {
    opacity: 0.5,
  },
}));

const { getCurrentMeAccessToken, getSpotifyPlayer } = selectors;

export default function SkipButton({ action, color, demo }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const access_token = useSelector((state) => getCurrentMeAccessToken(state));
  const player = useSelector((state) => getSpotifyPlayer(state));

  const [execute, setExecute] = useState(false);

  useEffect(() => {
    if (action && execute && access_token) {
      spotify(access_token)
        .post(`me/player/${action}`)
        .then((_) => {
          setExecute(false);
          dispatch(actions.setSpotifyPlayerSync(true));
        })
        .catch((_) => {
          setExecute(false);
          dispatch(actions.setSpotifyPlayerSync(true));
        });
    }
  }, [dispatch, access_token, setExecute, execute, action]);

  let icon;
  switch (action) {
    case "next":
      icon = <SkipNext fontSize="small" style={{ color: color }} />;
      break;
    case "previous":
      icon = <SkipPrevious fontSize="small" style={{ color: color }} />;
      break;
    default:
      //fallback
      icon = <FiberManualRecord fontSize="small" style={{ color: color }} />;
      break;
  }

  return (
    <IconButton
      disabled={!player || Boolean(demo)}
      onClick={() => setExecute(true)}
      classes={{
        disabled: classes.disabled,
      }}
    >
      {icon}
    </IconButton>
  );
}
