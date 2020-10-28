import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button,
        List, ListItem, ListItemAvatar, ListItemText,
        Avatar, Typography, Divider } from '@material-ui/core';

import spotify from 'utils/spotify';

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
  const { history, access_token, setSyncer } = props;
  const [loadMore, setLoadMore] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [nextQuery, setNextQuery] = useState(undefined);
  const classes = useStyles();

  useEffect(() => {
    if (access_token && loadMore) {
      const query = nextQuery ? nextQuery.split('?')[1] : '';
      setLoadMore(false);
      spotify(access_token).get(`me/playlists?${query}`)
      .then(res => {
        setPlaylists(playlists => playlists.concat(res.data.items));
        setNextQuery(res.data.next);
      }).catch( _ => {
        console.log('error');
      });
    }

  }, [access_token, playlists, setSyncer, nextQuery, loadMore]);

  return (
    <Box marginTop={5} marginBottom={5}>
      <List>
        {playlists && playlists.map((playlist, i) => (
          <Box key={playlist.id + i}>
            <ListItem button alignItems="center" onClick={()=> { history.push(`playlist?id=${playlist.id}`) }}>
              <ListItemAvatar>
                {
                  playlist.images.length > 0 ?
                    <Avatar alt={playlist.name} src={playlist.images[0].url} />
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
            <Divider />
          </Box>
        ))}
      </List>
      {
        nextQuery && (
          <Button onClick={() => setLoadMore(true)}>Load more</Button>
        )
      }
    </Box>
  );
}