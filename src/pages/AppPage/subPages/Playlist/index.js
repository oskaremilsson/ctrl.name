import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Box, Button, IconButton, Typography,
  List, ListItem, ListItemAvatar, ListItemText,
  Avatar, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close as CloseIcon } from '@material-ui/icons';

import spotify from 'utils/spotify';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function Playlist(props) {
  const classes = useStyles();

  const { history, location, access_token } = props;
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
        console.log(res.data);
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
        console.log(res.data);
        setNextQuery(res.data.next);
      }).catch( _ => {
        console.log('error');
      });
    }
  }, [access_token, id, tracks, loadMore, nextQuery]);

  console.log(nextQuery);

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
            <ListItem alignItems="center">
              <ListItemAvatar>
                {
                  track.track.album.images.length > 0 ?
                    <Avatar alt={track.track.name} src={track.track.album.images[0].url} />
                  :
                    <Avatar alt={track.track.name} />
                }
              </ListItemAvatar>
              <ListItemText
                primary={track.track.name}
                secondary={
                    <Typography
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {track.track.artists.map((artist)=> artist.name).join(', ')}
                    </Typography>
                }
              />
            </ListItem>
            <Divider />
            </Box>
        ))}
      </List>
      {
        nextQuery && (
          <Button onClick={() => setLoadMore(true)}>Load more</Button>
        )
      }
    </Box>
  );
}
