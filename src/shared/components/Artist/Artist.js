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

  const [albums, setAlbums] = useState([]);
  const [loadAlbums, setLoadAlbums] = useState(true);
  const [nextAlbums, setNextAlbums] = useState(undefined);

  const [singles, setSingles] = useState([]);
  const [loadSingles, setLoadSingles] = useState(true);
  const [nextSingles, setNextSingles] = useState(undefined);

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
    if (access_token && loadAlbums) {
      spotify(access_token, nextAlbums)
        .get(
          nextAlbums ||
            `artists/${artist.id}/albums?country=from_token&include_groups=album`
        )
        .then((res) => {
          if (mounted) {
            setLoadAlbums(false);
            setAlbums((albums) => albums.concat(res.data.items));

            setNextAlbums(res.data.next);
            if (res.data.next) {
              setLoadAlbums(true);
            }
          }
        })
        .catch((_) => {
          console.log("error", _);
        });
    }

    return () => (mounted = false);
  }, [access_token, artist, albums, loadAlbums, nextAlbums]);

  useEffect(() => {
    let mounted = true;
    if (access_token && loadSingles) {
      spotify(access_token, nextSingles)
        .get(
          nextSingles ||
            `artists/${artist.id}/albums?country=from_token&include_groups=single`
        )
        .then((res) => {
          if (mounted) {
            setLoadSingles(false);
            setSingles((singles) => singles.concat(res.data.items));

            setNextSingles(res.data.next);
            if (res.data.next) {
              setLoadSingles(true);
            }
          }
        })
        .catch((_) => {
          console.log("error", _);
        });
    }

    return () => (mounted = false);
  }, [access_token, artist, singles, loadSingles, nextSingles]);

  return (
    <Box>
      <List className={classes.list}>
        {tracks?.length > 0 && <ListSubheader>Popular Tracks</ListSubheader>}
        {tracks &&
          tracks.map((track, i) => (
            <Box key={track && track.uri + i}>
              <TrackListItem track={track} />
              <Divider />
            </Box>
          ))}

        {albums?.length > 0 && <ListSubheader>Albums</ListSubheader>}
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

        {singles?.length > 0 && <ListSubheader>Singles & EPs</ListSubheader>}
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
