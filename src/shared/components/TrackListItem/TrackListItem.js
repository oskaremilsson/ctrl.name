import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from 'shared/stores';

import {
  Box,
  IconButton,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Snackbar
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { QueueMusic } from '@material-ui/icons';

import Alert from '@material-ui/lab/Alert';

import spotify from 'utils/spotify';

const { getSpotifyPlayer, getCurrentMeAccessToken } = selectors;

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

export default function TrackListItem(props) {
  const classes = useStyles();
  const access_token = useSelector((state) => getCurrentMeAccessToken(state));
  const player = useSelector((state) => getSpotifyPlayer(state));

  const { track } = props;
  const [openQueueSuccess, setOpenQueueSuccess] = useState(false);
  const [openQueueFailure, setOpenQueueFailure] = useState(false);

  const queueTrack = (uri) => {
    spotify(access_token).post(`me/player/queue?uri=${uri}`)
      .then(_ => {
        setOpenQueueSuccess(true);
      }).catch(_ => {
        setOpenQueueFailure(true);
      });
  };

  return (
    <Box>
      <ListItem alignItems="center">
        <ListItemAvatar>
          {
            track.track.album.images.length > 0 ?
              <Avatar alt={track.track.name} src={track.track.album.images[track.track.album.images.length - 1].url} />
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
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => queueTrack(track.track.uri)}
            edge="end"
            aria-label="queue"
            disabled={!player}
          >
            <QueueMusic />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openQueueSuccess}
        autoHideDuration={6000}
        onClose={() => {setOpenQueueSuccess(false)}}
      >
        <Alert
          elevation={6}
          severity="success"
          variant="filled"
        >
          Successfully queued!
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openQueueFailure}
        autoHideDuration={6000}
        onClose={() => {setOpenQueueFailure(false)}}
      >
        <Alert
          elevation={6}
          severity="error"
          variant="filled"
        >
          Failed to queue.
        </Alert>
      </Snackbar>
    </Box>
  );
}
