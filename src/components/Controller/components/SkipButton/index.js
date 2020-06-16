import React from 'react';
import spotify from '../../../../utils/spotify';
import { SkipNext, SkipPrevious, FiberManualRecord } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const spotifyAction = (access_token, action, setSyncer) => {
  spotify(access_token).post(`me/player/${action}`)
  .then(_ => {
    setSyncer(true);
  }).catch( _ => {
    setSyncer(true);
  });
};

export default function SkipButton(props) {
  const { action, access_token, player, setSyncer } = props;

  let icon;
  switch (action) {
    case 'next':
      icon = <SkipNext fontSize="small" />
      break;
    case 'previous':
      icon = <SkipPrevious fontSize="small" />
      break;
    default:
      //fallback
      icon = <FiberManualRecord fontSize="medium" />
      break;
  }

  return (
    <IconButton disabled={player === ''} onClick={() => spotifyAction(access_token, action, setSyncer)}>
      { icon }
    </IconButton>
  );
}
