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

import Artist from 'shared/components/Artist';
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

export default function ArtistListItem({ artist }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <ListItem button alignItems="center" onClick={()=> { setOpen(true) }}>
        <ListItemAvatar>
          {
            artist.images.length > 0 ?
              <Avatar
                variant="circle"
                alt={artist.name}
                src={artist.images[artist.images.length - 1].url}
              />
            :
              <Avatar
                variant="circle"
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
      <FullscreenDialog
        open={open}
        setOpen={setOpen}
        title={artist && artist.name}
        image={artist && artist.images && artist.images.length > 0 && artist.images[0].url}
        avatarVariant={"circle"}
      >
        <Artist artist={artist} />
      </FullscreenDialog>
    </Box>
  );
}
