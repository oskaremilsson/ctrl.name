import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Slide,
  Dialog
} from '@material-ui/core';

import Playlist from 'shared/components/Playlist';

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PlaylistListItem(props) {
  const { playlist } = props;
  const classes = useStyles();
  const [openPlaylist, setOpenPlaylist] = useState(false);

  return (
    <Box>
      <ListItem button alignItems="center" onClick={()=> { setOpenPlaylist(true) }}>
        <ListItemAvatar>
          {
            playlist.images.length > 0 ?
              <Avatar alt={playlist.name} src={playlist.images[playlist.images.length - 1].url} />
            :
              <Avatar alt={playlist.name} />
          }
        </ListItemAvatar>
        <ListItemText
          primary={playlist.name}
          secondary={
              <Typography
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {playlist.tracks.total} items
              </Typography>
          }
        />
      </ListItem>
      <Dialog fullScreen open={openPlaylist} onClose={() => { setOpenPlaylist(false) }} TransitionComponent={Transition}>
        <Playlist playlist={playlist} setOpenPlaylist={setOpenPlaylist} />
      </Dialog>
    </Box>
  );
}