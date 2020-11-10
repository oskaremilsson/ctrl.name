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

import Album from 'shared/components/Album';
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

export default function AlbumListItem({ album, subTitle, subTitleColor }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <ListItem button alignItems="center" onClick={()=> { setOpen(true) }}>
        <ListItemAvatar>
          {
            album.images.length > 0 ?
              <Avatar
                variant="rounded"
                alt={album.name}
                src={album.images[album.images.length - 1].url}
              />
            :
              <Avatar
                variant="rounded"
                alt={album.name}
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
              { album.name }
            </Typography>
          }
          secondary={
              <Typography
                variant="body2"
                className={classes.inline}
                color={subTitleColor || "textPrimary"}
              >
                { subTitle || album.artists.map((artist)=> artist.name).join(', ') }
              </Typography>
          }
        />
      </ListItem>
      <FullscreenDialog
        open={open}
        setOpen={setOpen}
        title={album && album.name}
        image={album && album.images && album.images.length > 0 && album.images[0].url}
      >
        <Album album={album} />
      </FullscreenDialog>
    </Box>
  );
}
