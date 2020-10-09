import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from 'shared/stores';

import spotify from 'utils/spotify';
import { PlayArrow, Pause } from '@material-ui/icons';
import { Box, IconButton } from '@material-ui/core';

export default function PlayButton(props) {
  const dispatch = useDispatch();
  const { access_token, player } = props;
  const isPlaying = player && player.is_playing;
  const [action, setAction] = useState(false);

  useEffect(() => {
    if (action) {
      spotify(access_token).put(`me/player/${action}`)
      .then(_ => {
        dispatch(actions.setSpotifyPlayerSync(true));
      }).catch( _ => {
        dispatch(actions.setSpotifyPlayerSync(true));
      });
    }
  }, [dispatch, access_token, action]);

  return (
    <Box>
      { isPlaying ?
        <IconButton disabled={!player} onClick={() => setAction('pause')}>
          <Pause fontSize="large" />
        </IconButton>
        :
        <IconButton disabled={!player} onClick={() => setAction('play')} >
          <PlayArrow fontSize="large" />
        </IconButton>
      }
    </Box>
  );
}
