import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from 'shared/stores';

import queryString from 'query-string';
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

  const { history, location } = props;
  const query = queryString.parse(location.search);
  const id = query && query.id;

  const [playlist, setPlaylist] = useState(undefined);
  const [tracks, setTracks] = useState([]);
  const [nextQuery, setNextQuery] = useState(undefined);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (access_token && !playlist) {
      spotify(access_token).get(`playlists/${id}`)
      .then(res => {
        setPlaylist(res.data);
        setNextQuery(res.data.tracks.next);
        setTracks(tracks => tracks.concat(res.data.tracks.items));
      }).catch( _ => {
        console.log('error');
      });
    }

  }, [access_token, playlist, id]);

  useEffect(() => {
    if (access_token && nextQuery && loadMore) {
      const query = nextQuery ? nextQuery.split('?')[1] : '';
      setLoadMore(false);
      spotify(access_token).get(`playlists/${id}/tracks?${query}`)
      .then(res => {
        setTracks(tracks => tracks.concat(res.data.items));
        setNextQuery(res.data.next);
      }).catch( _ => {
        console.log('error');
      });
    }
  }, [access_token, id, tracks, loadMore, nextQuery]);

  return (
    <Box marginTop={5} marginBottom={5}>
      <IconButton onClick={ () => history.push('/') }>
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
