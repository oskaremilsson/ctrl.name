import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from 'shared/stores';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  AppBar,
  Toolbar,
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

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'fixed',
    background: theme.palette.background.default,
  },
  title: {
    flex: 1,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
}));

export default function Playlist(props) {
  const classes = useStyles();
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
    <Box>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setOpenPlaylist(false)} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            { playlist && playlist.name }
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        padding={2}
        marginBottom={5}
        marginTop={7}
      >

        <List>
          {tracks && tracks.map((track, i) => (
            <Box key={track.track && track.track.uri + i}>
              <TrackListItem track={track.track} />
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
    </Box>
  );
}
