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
  const [startPlaylist, setStartPlaylist] = useState(undefined);
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

    if (access_token && startPlaylist) {
      spotify(access_token).get(`playlists/${startPlaylist.id}/tracks`).then(res => {
        const items = res && res.data && res.data.items;
        if (items) {
          items.forEach((item) => {
            const track = item.track;
            if (track && !track.is_local && track.type === "track") {
              console.log(item.track.uri);
              spotify(access_token).post(`me/player/queue?uri=${track.uri}`)
              .then(res => {
                console.log(res);
              }).catch( _ => {
                console.log('error');
              });
            }
          });
        }
      })
      
      console.log('start new playlist!', startPlaylist);
    }
  }, [access_token, playlists, setSyncer, startPlaylist, setStartPlaylist]);

  return (
    <Box marginTop={5}>
      <Typography variant="body2">
        NOTE: Selecting a playlist will queue it's first 100 songs
      </Typography>
      <Typography variant="body2">
        This is due to the fact that Spotify Web API doesn't support change of now-playing playlist
      </Typography>
      <List>
        {playlists && playlists.map((playlist) => (
          <Box key={playlist.id}>
            <ListItem button alignItems="center" onClick={()=> {setStartPlaylist(playlist)}}>
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