import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography
} from '@material-ui/core';

import Playlist from 'shared/components/Playlist';
import FullscreenDialog from 'shared/components/FullscreenDialog';

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

export default function PlaylistListItem(props) {
  const { playlist } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <ListItem button alignItems="center" onClick={()=> { setOpen(true) }}>
        <ListItemAvatar>
          {
            playlist.images.length > 0 ?
              <Avatar
                variant="rounded"
                alt={playlist.name}
                src={playlist.images[playlist.images.length - 1].url}
              />
            :
              <Avatar
                variant="rounded"
                alt={playlist.name}
              />
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
              { playlist.name }
            </Typography>
          }
          secondary={
              <Typography
                variant="body2"
                className={classes.inline}
                color="textSecondary"
              >
                {playlist.tracks.total} tracks
              </Typography>
          }
        />
      </ListItem>
      <FullscreenDialog
        open={open}
        setOpen={setOpen}
        title={playlist && playlist.name}
        image={playlist && playlist.images && playlist.images.length > 0 && playlist.images[0].url}
      >
        <Playlist playlist={playlist} />
      </FullscreenDialog>
    </Box>
  );
}