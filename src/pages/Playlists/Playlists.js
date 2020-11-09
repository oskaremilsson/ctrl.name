import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from 'shared/stores';

import {
  Box,
  Button,
  List,
  Divider,
  CircularProgress
} from '@material-ui/core';

import PlaylistListItem from 'shared/components/PlaylistListItem';
import spotify from 'utils/spotify';

const { getCurrentMeAccessToken } = selectors;

export default function Playlists() {
  const access_token = useSelector((state) => getCurrentMeAccessToken(state));

  const [loadMore, setLoadMore] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [nextQuery, setNextQuery] = useState(undefined);

  useEffect(() => {
    let mounted = true;
    if (access_token && loadMore) {
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
  }, [access_token, playlists, nextQuery, loadMore]);

  return (
    <Box padding={2}>
      <List>
        {playlists && playlists.map((playlist, i) => (
          <Box key={playlist.id + i}>
            <PlaylistListItem playlist={playlist} />
            <Divider />
          </Box>
        ))}
      </List>

      { loadMore &&
        <Box
          display="flex"
          justifyContent="center"
        >
          <CircularProgress />
        </Box>
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