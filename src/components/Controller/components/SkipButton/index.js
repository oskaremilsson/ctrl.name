import React, { useState, useEffect } from 'react';
import spotify from '../../../../utils/spotify';
import { SkipNext, SkipPrevious, FiberManualRecord } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

export default function SkipButton(props) {
  const { action, access_token, player, setSyncer } = props;
  const [execute, setExecute] = useState(false);

  useEffect(() => {
    if (action && execute) {
      spotify(access_token).post(`me/player/${action}`)
      .then(_ => {
        setSyncer(true);
        setExecute(false);
      }).catch( _ => {
        setSyncer(true);
        setExecute(false);
      });
    }
  }, [access_token, setSyncer, setExecute, execute, action]);

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
      icon = <FiberManualRecord fontSize="small" />
      break;
  }

  return (
    <IconButton disabled={!player} onClick={() => setExecute(true)}>
      { icon }
    </IconButton>
  );
}
