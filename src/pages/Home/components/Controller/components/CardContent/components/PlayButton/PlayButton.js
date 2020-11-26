import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "shared/stores";
import { makeStyles } from "@material-ui/core/styles";

import spotify from "utils/spotify";
import { PlayArrow, Pause } from "@material-ui/icons";
import { Box, IconButton } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  disabled: {
    opacity: 0.5,
  },
}));

const { getCurrentMeAccessToken, getSpotifyPlayer } = selectors;

export default function PlayButton({ color }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const access_token = useSelector((state) => getCurrentMeAccessToken(state));
  const player = useSelector((state) => getSpotifyPlayer(state));

  const isPlaying = player && player.is_playing;
  const [action, setAction] = useState(false);

  useEffect(() => {
    if (action && access_token) {
      spotify(access_token)
        .put(`me/player/${action}`)
        .then((_) => {
          setAction(false);
          dispatch(actions.setSpotifyPlayerSync(true));
        })
        .catch((_) => {
          setAction(false);
          dispatch(actions.setSpotifyPlayerSync(true));
        });
    }
  }, [dispatch, access_token, action]);

  let icon;
  let handleClick;
  if (isPlaying) {
    icon = <Pause fontSize="large" style={{ color: color }} />;
    handleClick = () => setAction("pause");
  } else {
    icon = <PlayArrow fontSize="large" style={{ color: color }} />;
    handleClick = () => setAction("play");
  }

  return (
    <Box>
      <IconButton
        disabled={!player}
        onClick={handleClick}
        classes={{
          disabled: classes.disabled,
        }}
      >
        {icon}
      </IconButton>
    </Box>
  );
}
