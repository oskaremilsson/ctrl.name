import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box,
        List, ListItem, ListItemAvatar, ListItemText,
        Avatar, Typography, Divider } from '@material-ui/core';

import spotify from '../../../../utils/spotify';

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

export default function Playlists(props) {
  const { access_token, setSyncer } = props;
  const [playlists, setPlaylists] = useState(undefined);
  const [openPlaylist, setOpenPlaylist] = useState(undefined);
  const classes = useStyles();

  useEffect(() => {
    if (access_token && !playlists) {
      spotify(access_token).get(`me/playlists`)
      .then(res => {
        setPlaylists(res.data.items);
      }).catch( _ => {
        console.log('error');
      });
    }

    if (access_token && openPlaylist) {
      console.log('Open playlist:', openPlaylist);
    }
  }, [access_token, playlists, setSyncer, openPlaylist, setOpenPlaylist]);

  return (
    <Box marginTop={5}>
      <List>
        {playlists && playlists.map((playlist) => (
          <Box key={playlist.id}>
            <ListItem button alignItems="center" onClick={()=> {setOpenPlaylist(playlist)}}>
              <ListItemAvatar>
                <Avatar alt={playlist.name} src={playlist.images[0].url} />
              </ListItemAvatar>
              <ListItemText
                primary={playlist.name}
                secondary={
                    <Typography
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {playlist.description}
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