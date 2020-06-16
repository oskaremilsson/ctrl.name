import React from 'react';
import spotify from '../../../../utils/spotify';
import { PlayCircleFilled, PauseCircleFilled } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
import { Box, IconButton } from '@material-ui/core';

const spotifyAction = (access_token, action, setSyncer) => {
  spotify(access_token).put(`me/player/${action}`)
  .then(_ => {
    setSyncer(true);
  }).catch( _ => {
    setSyncer(true);
  });
};

export default function PlayButton(props) {
  const { access_token, player, setSyncer } = props;
  const isPlaying = player && player.is_playing;

  return (
    <Box>
      { isPlaying ?
        <IconButton disabled={!player} onClick={() => spotifyAction(access_token, 'pause', setSyncer)}>
          <PauseCircleFilled fontSize="large" style={{ color: green[500] }} />
        </IconButton>
        :
        <IconButton disabled={!player} onClick={() => spotifyAction(access_token, 'play', setSyncer)} >
          <PlayCircleFilled fontSize="large" style={{ color: green[500] }} />
        </IconButton>
      }
    </Box>
  );
}
