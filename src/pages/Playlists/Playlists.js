import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions  } from 'shared/stores';

import {
  Box,
  List,
  Divider,
  CircularProgress,
  Avatar
} from '@material-ui/core';

import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

import PlaylistListItem from 'shared/components/PlaylistListItem';
import spotify from 'utils/spotify';

const {
  getPlaylists,
  getCurrentMe,
  getCurrentMeAccessToken,
  getMe,
  getMeAccessToken,
} = selectors;

export default function Playlists() {
  const dispatch = useDispatch();
  const currentMeAccessToken = useSelector((state) => getCurrentMeAccessToken(state));
  const currentMe = useSelector((state) => getCurrentMe(state));
  const me = useSelector((state) => getMe(state));
  const meAccessToken = useSelector((state) => getMeAccessToken(state));

  const storedPlaylists = useSelector((state) => getPlaylists(state));

  const [selectedPlaylists, setSelectedPlaylists] = useState('me');
  const [accessToken, setAccessToken] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [nextQuery, setNextQuery] = useState(undefined);
  const [allLoaded, setAllLoaded] = useState(false);

  const meAvatarAlt = (me && me.id) || 'me';
  const meAvatarImg = me && me.images && me.images[0] && me.images[0].url;

  const currentMeAvatarAlt = (me && me.id) || 'current';
  const currentMeAvatarImg = me && me.images && me.images[0] && me.images[0].url;

  useEffect(() => {
    if (meAccessToken && currentMeAccessToken && storedPlaylists && currentMe && me && selectedPlaylists && !accessToken) {
      let selectedId;
      if (selectedPlaylists === 'me') {
        selectedId = me.id;
        setAccessToken(meAccessToken);
      } else {
        selectedId = currentMe.id;
        setAccessToken(currentMeAccessToken);
      }

      if (!storedPlaylists[selectedId]) {
        setLoadMore(true);
      } else {
        setPlaylists(storedPlaylists[selectedId]);
      }
    }
  }, [accessToken, selectedPlaylists, storedPlaylists, currentMe, currentMeAccessToken, me, meAccessToken]);

  useEffect(() => {
    let mounted = true;
    if (accessToken && loadMore) {
      const query = nextQuery ? nextQuery.split('?')[1] : '';
      spotify(accessToken).get(`me/playlists?${query}`)
        .then(res => {
          if (mounted) {
            setLoadMore(false);
            setPlaylists(playlists => playlists.concat(res.data.items));
            setNextQuery(res.data.next);

            if (res.data.next) {
              setLoadMore(true);
            } else {
              setAllLoaded(true);
            }
          }
        }).catch(_ => {
          console.log('error');
        });
    }

    return () => mounted = false;
  }, [accessToken, playlists, nextQuery, loadMore, currentMe]);

  useEffect(() => {
    if (me && currentMe && selectedPlaylists && allLoaded && playlists && storedPlaylists) {
      let selectedId;
      if (selectedPlaylists === 'me') {
        selectedId = me.id;
      } else {
        selectedId = currentMe.id;
      }
      setAllLoaded(false);
      dispatch(actions.setPlaylists({ ...storedPlaylists, ...{ [selectedId]: playlists } }));
    }
  }, [dispatch, me, currentMe, selectedPlaylists, allLoaded, playlists, storedPlaylists]);

  return (
    <Box padding={2}>
      <ToggleButtonGroup
        value={selectedPlaylists}
        exclusive
        onChange={(_, value) => {
          if (value !== null) {
            setSelectedPlaylists(value);
            setPlaylists([]);
            setAccessToken(undefined);
            setNextQuery(undefined);
          }
        }}
        aria-label="playlist selector"
      >
        <ToggleButton value="me" aria-label="my playlists">
          <Avatar alt={meAvatarAlt} src={meAvatarImg} />
        </ToggleButton>
        <ToggleButton value="currentMe" aria-label="currentme playlists">
          <Avatar alt={currentMeAvatarAlt} src={currentMeAvatarImg} />
        </ToggleButton>
      </ToggleButtonGroup>
      <List>
        {playlists && playlists.map((playlist, i) => (
          <Box key={playlist.id + i}>
            <PlaylistListItem playlist={playlist} />
            <Divider />
          </Box>
        ))}
      </List>

      { (loadMore || (playlists && playlists.length < 1)) &&
        <Box
          display="flex"
          justifyContent="center"
        >
          <CircularProgress />
        </Box>
      }
    </Box>
  );
}
