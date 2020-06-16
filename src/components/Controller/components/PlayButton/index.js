import React from 'react';
import spotify from '../../../../utils/spotify';
import { PlayCircleFilled, PauseCircleFilled } from '@material-ui/icons';
import { green, grey } from '@material-ui/core/colors';
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
  const activePlayer = player !== '';
  let iconStyle;
  if (player !== '') {
    iconStyle = { color: green[500] }
  } else {
    iconStyle = { color: grey[400] }
  }

  return (
    <Box>
      { isPlaying ?
        <IconButton disabled={!activePlayer} onClick={() => spotifyAction(access_token, 'pause', setSyncer)}>
          <PauseCircleFilled fontSize="large" style={iconStyle} />
        </IconButton>
        :
        <IconButton disabled={!activePlayer} onClick={() => spotifyAction(access_token, 'play', setSyncer)} >
          <PlayCircleFilled fontSize="large" style={iconStyle} />
        </IconButton>
      }
    </Box>
  );
}
