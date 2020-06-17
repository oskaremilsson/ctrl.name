import React, { useEffect, useState } from 'react';
import spotify from '../../../../utils/spotify';
import { PlayArrow, Pause } from '@material-ui/icons';
import { Box, IconButton } from '@material-ui/core';

export default function PlayButton(props) {
  const { access_token, player, setSyncer } = props;
  const isPlaying = player && player.is_playing;
  const [action, setAction] = useState(false);

  useEffect(() => {
    if (action) {
      spotify(access_token).put(`me/player/${action}`)
      .then(_ => {
        setSyncer(true);
      }).catch( _ => {
        setSyncer(true);
      });
    }
  }, [access_token, action, setSyncer]);

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
