import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "shared/stores";

import {
  makeStyles,
  Box,
  List,
  ListSubheader,
  Divider,
} from "@material-ui/core";

import TrackListItem from "shared/components/TrackListItem";
import AlbumListItem from "shared/components/AlbumListItem";
import spotify from "utils/spotify";

const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const { getCurrentMeAccessToken } = selectors;

export default function Artist({ artist }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const access_token = useSelector((state) => getCurrentMeAccessToken(state));
  const [tracks, setTracks] = useState(undefined);
  const [albums, setAlbums] = useState(undefined);
  const [singles, setSingles] = useState(undefined);

  useEffect(() => {
    let mounted = true;
    if (access_token && !tracks) {
      dispatch(actions.setSpotifyPlayerSync(true));
      spotify(access_token)
        .get(`artists/${artist.id}/top-tracks?country=from_token`)
        .then((res) => {
          if (mounted) {
            setTracks(res.data.tracks);
          }
        })
        .catch((_) => {
          console.log("error", _);
        });
    }

    return () => (mounted = false);
  }, [dispatch, access_token, artist, tracks]);

  useEffect(() => {
    let mounted = true;
    if (access_token && !albums) {
      spotify(access_token)
        .get(
          `artists/${artist.id}/albums?country=from_token&include_groups=album`
        )
        .then((res) => {
          if (mounted) {
            setAlbums(res.data.items);
          }
        })
        .catch((_) => {
          console.log("error", _);
        });
    }

    return () => (mounted = false);
  }, [access_token, artist, albums]);

  useEffect(() => {
    let mounted = true;
    if (access_token && !singles) {
      spotify(access_token)
        .get(
          `artists/${artist.id}/albums?country=from_token&include_groups=single`
        )
        .then((res) => {
          if (mounted) {
            setSingles(res.data.items);
          }
        })
        .catch((_) => {
          console.log("error", _);
        });
    }

    return () => (mounted = false);
  }, [access_token, artist, singles]);

  return (
    <Box>
      <List className={classes.list}>
        {tracks && <ListSubheader>Popular Tracks</ListSubheader>}
        {tracks &&
          tracks.map((track, i) => (
            <Box key={track && track.uri + i}>
              <TrackListItem track={track} />
              <Divider />
            </Box>
          ))}

        {albums && <ListSubheader>Albums</ListSubheader>}
        {albums &&
          albums.map((album, i) => (
            <Box key={album && album.uri + i}>
              <AlbumListItem
                album={album}
                subTitle={
                  album.release_date && album.release_date.split("-")[0]
                }
                subTitleColor="textSecondary"
              />
              <Divider />
            </Box>
          ))}

        {singles && <ListSubheader>Singles & EPs</ListSubheader>}
        {singles &&
          singles.map((single, i) => (
            <Box key={single && single.uri + i}>
              <AlbumListItem
                album={single}
                subTitle={
                  single.release_date && single.release_date.split("-")[0]
                }
                subTitleColor="textSecondary"
              />
              <Divider />
            </Box>
          ))}
      </List>
    </Box>
  );
}
