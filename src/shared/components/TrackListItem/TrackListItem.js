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
  Snackbar,
  Slide
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
  title: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  inline: {
    display: 'inline',
  },
}));

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export default function TrackListItem(props) {
  const classes = useStyles();
  const access_token = useSelector((state) => getCurrentMeAccessToken(state));
  const player = useSelector((state) => getSpotifyPlayer(state));

  const { track, avatarVariant } = props;

  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState(false);

  const queueTrack = (uri) => {
    spotify(access_token).post(`me/player/queue?uri=${uri}`)
      .then(_ => {
        setSnackMessage('Added to queue!');
        setSnackSeverity('success');
        setOpenSnack(true);
      }).catch(_ => {
        setSnackMessage('Failed to queue!');
        setSnackSeverity('error');
        setOpenSnack(true);
      });
  };

  if (!track) return (<></>);

  let image;
  if (track.album && track.album.images) {
    if (track.album.images.length > 1) {
      image = track.album.images[track.album.images.length - 1].url;
    }
  }

  return (
    <Box>
      <ListItem alignItems="center">
        <ListItemAvatar>
          {
            image ?
              <Avatar
                variant={avatarVariant || "rounded"}
                alt={track.name}
                src={image}
              />
            :
              <Avatar
                variant={avatarVariant || "rounded"}
                alt={track.name}
              >{track.track_number}</Avatar>
          }
        </ListItemAvatar>
        <ListItemText
          disableTypography={true}
          primary={
            <Typography
              variant="body1"
              className={classes.title}
              color="textPrimary"
            >
              { track.name }
            </Typography>
          }
          secondary={
              <Typography
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {track.artists.map((artist)=> artist.name).join(', ')}
              </Typography>
          }
        />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => queueTrack(track.uri)}
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
        open={openSnack}
        autoHideDuration={1500}
        onClose={() => { setOpenSnack(false) }}
        TransitionComponent={TransitionDown}
      >
        <Alert
          onClose={() => {setOpenSnack(false)}}
          elevation={6}
          severity={snackSeverity}
          variant="filled"
        >
          { snackMessage }
        </Alert>
      </Snackbar>
    </Box>
  );
}
