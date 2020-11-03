import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from 'shared/stores';

import {
  Box,
  Button,
  IconButton,
  Typography,
  List,
  Divider,
} from '@material-ui/core';

import { Close as CloseIcon } from '@material-ui/icons';

import TrackListItem from 'shared/components/TrackListItem';
import spotify from 'utils/spotify';

const { getCurrentMeAccessToken } = selectors;

export default function Playlist(props) {
  const access_token = useSelector((state) => getCurrentMeAccessToken(state));
  const { playlist, setOpenPlaylist } = props;

  const [tracks, setTracks] = useState([]);
  const [nextQuery, setNextQuery] = useState(undefined);
  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    if (access_token && loadMore) {
      const query = nextQuery ? nextQuery.split('?')[1] : '';
      setLoadMore(false);
      spotify(access_token).get(`playlists/${playlist.id}/tracks?${query}`)
      .then(res => {
        setTracks(tracks => tracks.concat(res.data.items));
        setNextQuery(res.data.next);
      }).catch( _ => {
        console.log('error');
      });
    }
  }, [access_token, playlist, tracks, loadMore, nextQuery]);

  return (
    <Box padding={2} marginBottom={5}>
      <IconButton onClick={ () => setOpenPlaylist(false) }>
        <CloseIcon />
      </IconButton>

      <Box marginBottom={1}>
        <Typography component="h5" variant="h5">
          { playlist && playlist.name }
        </Typography>
      </Box>

      <List>
        {tracks && tracks.map((track, i) => (
          <Box key={track.track.uri + i}>
            <TrackListItem track={track} />
            <Divider />
          </Box>
        ))}
      </List>
      {
        nextQuery && (
          <Box
            display="flex"
            justifyContent="center"
            padding={3}
          >
            <Button onClick={() => setLoadMore(true)}>Load more</Button>
          </Box>
        )
      }
    </Box>
  );
}
