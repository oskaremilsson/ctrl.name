import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectors } from "shared/stores";

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
  Slide,
} from "@material-ui/core";

import { QueueMusic } from "@material-ui/icons";

import Alert from "@material-ui/lab/Alert";

import spotify from "utils/spotify";

const { getSpotifyPlayer, getCurrentMeAccessToken } = selectors;

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export default function TrackListItem(props) {
  const access_token = useSelector((state) => getCurrentMeAccessToken(state));
  const player = useSelector((state) => getSpotifyPlayer(state));

  const { track, avatarVariant } = props;

  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState(false);

  const queueTrack = (uri) => {
    spotify(access_token)
      .post(`me/player/queue?uri=${uri}`)
      .then((_) => {
        setSnackMessage("Added to queue!");
        setSnackSeverity("success");
        setOpenSnack(true);
      })
      .catch((_) => {
        setSnackMessage("Failed to queue!");
        setSnackSeverity("error");
        setOpenSnack(true);
      });
  };

  if (!track) return <></>;

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
          {image ? (
            <Avatar
              variant={avatarVariant || "rounded"}
              alt={track.name}
              src={image}
            />
          ) : (
            <Avatar variant={avatarVariant || "rounded"} alt={track.name}>
              {track.track_number}
            </Avatar>
          )}
        </ListItemAvatar>
        <ListItemText
          disableTypography={true}
          primary={
            <Typography
              variant="body1"
              noWrap
              color={track.is_local ? "textSecondary" : "textPrimary"}
            >
              {track.name}
            </Typography>
          }
          secondary={
            <Typography
              variant="body2"
              display="inline"
              color={track.is_local ? "textSecondary" : "textPrimary"}
            >
              {track.artists.map((artist) => artist.name).join(", ")}
            </Typography>
          }
        />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => queueTrack(track.uri)}
            edge="end"
            aria-label="queue"
            disabled={!player || track.is_local}
          >
            <QueueMusic />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={openSnack}
        autoHideDuration={1500}
        onClose={() => {
          setOpenSnack(false);
        }}
        TransitionComponent={TransitionDown}
      >
        <Alert
          onClose={() => {
            setOpenSnack(false);
          }}
          elevation={6}
          severity={snackSeverity}
          variant="filled"
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
