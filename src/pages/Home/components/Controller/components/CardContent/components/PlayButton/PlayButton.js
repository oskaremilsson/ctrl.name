import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions } from 'shared/stores';

import spotify from 'utils/spotify';
import { PlayArrow, Pause } from '@material-ui/icons';
import { Box, IconButton } from '@material-ui/core';

const { getCurrentMeAccessToken, getSpotifyPlayer } = selectors;

export default function PlayButton({ color }) {
  const dispatch = useDispatch();
  const access_token = useSelector((state) => getCurrentMeAccessToken(state));
  const player = useSelector((state) => getSpotifyPlayer(state));

  const isPlaying = player && player.is_playing;
  const [action, setAction] = useState(false);

  useEffect(() => {
    if (action && access_token) {
      spotify(access_token).put(`me/player/${action}`)
      .then(_ => {
        setAction(false);
        dispatch(actions.setSpotifyPlayerSync(true));
      }).catch( _ => {
        setAction(false);
        dispatch(actions.setSpotifyPlayerSync(true));
      });
    }
  }, [dispatch, access_token, action]);

  return (
    <Box>
      { isPlaying ?
        <IconButton disabled={!player} onClick={() => setAction('pause')}>
          <Pause fontSize="large" style={{ color: color }}/>
        </IconButton>
        :
        <IconButton disabled={!player} onClick={() => setAction('play')} >
          <PlayArrow fontSize="large" style={{ color: color }}/>
        </IconButton>
      }
    </Box>
  );
}
