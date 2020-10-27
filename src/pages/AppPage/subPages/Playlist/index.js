import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Box, IconButton, Typography,
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
  const [tracks, setTracks] = useState(undefined);
  useEffect(() => {
    if (access_token && !playlist) {
      spotify(access_token).get(`playlists/${id}`)
      .then(res => {
        console.log(res.data);
        setPlaylist(res.data);
      }).catch( _ => {
        console.log('error');
      });
    }

    if (access_token && !tracks) {
      spotify(access_token).get(`playlists/${id}/tracks`)
      .then(res => {
        setTracks(res.data.items);
      }).catch( _ => {
        console.log('error');
      });
    }

  }, [access_token, playlist, tracks, id]);

  return (
    <Box>
      <IconButton onClick={ () => history.push('/') }>
        <CloseIcon />
      </IconButton>

      <Box marginBottom={1}>
        <Typography component="h5" variant="h5">
          { playlist && playlist.name }
        </Typography>
      </Box>

      <List>
        {tracks && tracks.map((track) => (
          <Box key={track.track.id || track.track.uri}>
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
                      {track.track.name}
                    </Typography>
                }
              />
            </ListItem>
            <Divider />
            </Box>
        ))}
      </List>

    </Box>
  );
}
