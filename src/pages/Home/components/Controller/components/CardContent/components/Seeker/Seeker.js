import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions } from 'shared/stores';

import spotify from 'utils/spotify';
import {
  Box,
  Slider,
  Typography
} from '@material-ui/core';

const { getCurrentMeAccessToken, getSpotifyPlayer } = selectors;

const mstoMSS = (ms) => {
  var minutes = Math.floor(ms / 60000);
  var seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
} 

export default function Seeker({ color }) {
  const dispatch = useDispatch();
  const access_token = useSelector((state) => getCurrentMeAccessToken(state));
  const player = useSelector((state) => getSpotifyPlayer(state));

  const [seek, setSeek] = useState(false);
  const [tempValue, setTempValue] = useState(false);

  useEffect(() => {
    if (seek && access_token) {
      spotify(access_token).put(`me/player/seek?position_ms=${seek}`)
      .then(_ => {
        setTempValue(false);
        setSeek(false);
        dispatch(actions.setSpotifyPlayerSync(true));
      }).catch( _ => {
        setTempValue(false);
        setSeek(false);
        dispatch(actions.setSpotifyPlayerSync(true));
      });
    }
  }, [dispatch, access_token, seek]);

  const progress = (player && player.progress_ms) || 0;
  const duration = (player && player.item && player.item.duration_ms) || 0;

  return (
    <Box>
      <Box paddingLeft={1} paddingRight={1}>
        <Slider
          style={{ color: color }}
          value={tempValue || progress}
          onChangeCommitted={(_, value) => { setSeek(value) }}
          onChange={(_, value) => { setTempValue(value); }}
          max={duration}
          step={1000}
          aria-labelledby="seek-track"
          disabled={!player}
        />
      </Box>

      { player &&
        <Box
          display="flex"
          justifyContent="space-between"
          paddingLeft={2}
          paddingRight={2}
          marginTop={-1}
          color={color}
        >
          <Typography variant="caption">
            { mstoMSS(tempValue || progress) }
          </Typography>
          <Typography variant="caption">
            { mstoMSS(duration) }
          </Typography>
        </Box>
      }
    </Box>
  );
}
