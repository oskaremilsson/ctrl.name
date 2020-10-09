import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from 'shared/stores';

import spotify from 'utils/spotify';
import { SkipNext, SkipPrevious, FiberManualRecord } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

export default function SkipButton(props) {
  const dispatch = useDispatch();
  const { action, access_token, player } = props;
  const [execute, setExecute] = useState(false);

  useEffect(() => {
    if (action && execute) {
      spotify(access_token).post(`me/player/${action}`)
      .then(_ => {
        dispatch(actions.setSpotifyPlayerSync(true));
        setExecute(false);
      }).catch( _ => {
        dispatch(actions.setSpotifyPlayerSync(true));
        setExecute(false);
      });
    }
  }, [dispatch, access_token, setExecute, execute, action]);

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
