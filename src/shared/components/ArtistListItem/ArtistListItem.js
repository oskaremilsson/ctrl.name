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

import Artist from 'shared/components/Artist';

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ArtistListItem(props) {
  const { artist } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <ListItem button alignItems="center" onClick={()=> { setOpen(true) }}>
        <ListItemAvatar>
          {
            artist.images.length > 0 ?
              <Avatar
                variant="rounded"
                alt={artist.name}
                src={artist.images[artist.images.length - 1].url}
              />
            :
              <Avatar
                variant="rounded"
                alt={artist.name}
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
              { artist.name }
            </Typography>
          }
          secondary={
              <Typography
                variant="body2"
                className={classes.inline}
                color="textSecondary"
              >
                { artist && artist.followers && artist.followers.total && `${artist.followers.total} followers` }
              </Typography>
          }
        />
      </ListItem>
      <Dialog fullScreen open={open} onClose={() => { setOpen(false) }} TransitionComponent={Transition}>
        <Artist artist={artist} setOpen={setOpen} />
      </Dialog>
    </Box>
  );
}