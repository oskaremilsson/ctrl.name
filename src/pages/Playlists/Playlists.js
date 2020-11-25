import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "shared/stores";
import { makeStyles } from "@material-ui/core/styles";

import {
  Box,
  List,
  ListSubheader,
  Divider,
  CircularProgress,
  Avatar,
} from "@material-ui/core";

import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import PlaylistListItem from "shared/components/PlaylistListItem";
import FloatingCurrentMe from "shared/components/FloatingCurrentMe";
import spotify from "utils/spotify";

const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: theme.palette.background.default,
  },
}));

const { getPlaylists, getCurrentMe, getMe, getMeAccessToken } = selectors;

export default function Playlists() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const currentMe = useSelector((state) => getCurrentMe(state));
  const me = useSelector((state) => getMe(state));
  const meAccessToken = useSelector((state) => getMeAccessToken(state));
  const storedPlaylists = useSelector((state) => getPlaylists(state));

  const [selectedPlaylists, setSelectedPlaylists] = useState(undefined);
  const [loadMore, setLoadMore] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [nextQuery, setNextQuery] = useState(undefined);
  const [allLoaded, setAllLoaded] = useState(false);

  const meAvatarAlt = (me && me.id) || "me";
  const meAvatarImg = me?.images[0]?.url;

  const currentMeAvatarAlt = currentMe?.id || "current";
  const currentMeAvatarImg = currentMe?.images[0]?.url;

  let listTitle = "My playlists";
  if (selectedPlaylists !== me?.id) {
    listTitle = `${currentMe?.display_name}'s playlists`;
    if (currentMe?.display_name === currentMe?.id) {
      listTitle = `ctrl.${selectedPlaylists}'s playlists`;
    }
  }

  useEffect(() => {
    if (me) {
      setSelectedPlaylists(me.id);
    }
  }, [me]);

  useEffect(() => {
    if (storedPlaylists && selectedPlaylists) {
      if (!storedPlaylists[selectedPlaylists]) {
        setLoadMore(true);
      } else {
        setPlaylists(storedPlaylists[selectedPlaylists]);
      }
    }
  }, [selectedPlaylists, storedPlaylists]);

  useEffect(() => {
    let mounted = true;
    if (meAccessToken && loadMore && me && selectedPlaylists) {
      const query = nextQuery ? nextQuery.split("?")[1] : "";
      const user =
        selectedPlaylists === me.id ? "me" : `users/${selectedPlaylists}`;
      spotify(meAccessToken)
        .get(`${user}/playlists?${query}`)
        .then((res) => {
          if (mounted) {
            setLoadMore(false);
            setPlaylists((playlists) => playlists.concat(res.data.items));
            setNextQuery(res.data.next);
            if (res.data.next) {
              setLoadMore(true);
            } else {
              setAllLoaded(true);
            }
          }
        })
        .catch((_) => {
          console.log("error");
        });
    }

    return () => (mounted = false);
  }, [meAccessToken, playlists, nextQuery, loadMore, me, selectedPlaylists]);

  useEffect(() => {
    if (selectedPlaylists && allLoaded && playlists && storedPlaylists) {
      setAllLoaded(false);
      dispatch(
        actions.setPlaylists({
          ...storedPlaylists,
          ...{ [selectedPlaylists]: playlists },
        })
      );
    }
  }, [dispatch, selectedPlaylists, allLoaded, playlists, storedPlaylists]);

  return (
    <Box padding={2}>
      <Box display="flex" justifyContent="center">
        {currentMe && me && currentMe?.id !== me?.id && (
          <ToggleButtonGroup
            value={selectedPlaylists}
            exclusive
            onChange={(_, value) => {
              if (value !== null) {
                setSelectedPlaylists(value);
                setPlaylists([]);
                setNextQuery(undefined);
              }
            }}
            aria-label="playlist selector"
          >
            <ToggleButton value={me.id} aria-label="my playlists">
              <Avatar alt={meAvatarAlt} src={meAvatarImg} />
            </ToggleButton>

            <ToggleButton value={currentMe.id} aria-label="currentMe playlists">
              <Avatar alt={currentMeAvatarAlt} src={currentMeAvatarImg} />
            </ToggleButton>
          </ToggleButtonGroup>
        )}
      </Box>

      <List className={classes.list}>
        <ListSubheader>{listTitle}</ListSubheader>
        {playlists &&
          playlists.map((playlist, i) => (
            <Box key={playlist.id + i}>
              <PlaylistListItem playlist={playlist} />
              <Divider />
            </Box>
          ))}
      </List>

      {(loadMore || (playlists && playlists.length < 1)) && (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      <FloatingCurrentMe />
    </Box>
  );
}
