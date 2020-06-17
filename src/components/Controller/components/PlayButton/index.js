import React, { useEffect, useState } from 'react';
import spotify from '../../../../utils/spotify';
import { PlayCircleFilled, PauseCircleFilled } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
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
          <PauseCircleFilled fontSize="large" style={{ color: green[500] }} />
        </IconButton>
        :
        <IconButton disabled={!player} onClick={() => setAction('play')} >
          <PlayCircleFilled fontSize="large" style={{ color: green[500] }} />
        </IconButton>
      }
    </Box>
  );
}
