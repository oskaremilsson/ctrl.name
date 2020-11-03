import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from 'shared/stores';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  CircularProgress
} from '@material-ui/core';

import spotify from 'utils/spotify';

const { getCurrentMeAccessToken } = selectors;

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
  const access_token = useSelector((state) => getCurrentMeAccessToken(state));

  const { history, setSyncer } = props;
  const [loadMore, setLoadMore] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [nextQuery, setNextQuery] = useState(undefined);
  const classes = useStyles();

  useEffect(() => {
    let mounted = true;
    if (access_token && loadMore) {
      console.log('load more');
      const query = nextQuery ? nextQuery.split('?')[1] : '';
      spotify(access_token).get(`me/playlists?${query}`)
      .then(res => {
        if(mounted){
          setLoadMore(false);
          setPlaylists(playlists => playlists.concat(res.data.items));
          setNextQuery(res.data.next);
        }
      }).catch( _ => {
        console.log('error');
      });
    }

    return () => mounted = false;

  }, [access_token, playlists, setSyncer, nextQuery, loadMore]);

  return (
    <Box padding={2}>
      <List>
        {playlists && playlists.map((playlist, i) => (
          <Box key={playlist.id + i}>
            <ListItem button alignItems="center" onClick={()=> { history.push(`playlist?id=${playlist.id}`) }}>
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
            <Divider />
          </Box>
        ))}
      </List>

      { loadMore &&
        <CircularProgress />
      }

      {
        nextQuery &&
          <Box
            display="flex"
            justifyContent="center"
            padding={3}
          >
            <Button onClick={() => setLoadMore(true)}>Load more</Button>
          </Box>
      }
    </Box>
  );
}