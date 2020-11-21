import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectors } from "shared/stores";

import {
  Box,
  List,
  Divider,
  Button,
  CircularProgress,
  Typography,
} from "@material-ui/core";

import TrackListItem from "shared/components/TrackListItem";
import spotify from "utils/spotify";

const { getCurrentMeAccessToken } = selectors;

export default function Playlist({ playlist }) {
  const access_token = useSelector((state) => getCurrentMeAccessToken(state));

  const [tracks, setTracks] = useState([]);
  const [nextQuery, setNextQuery] = useState(undefined);
  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (access_token && loadMore) {
      const query = nextQuery ? nextQuery.split("?")[1] : "";
      spotify(access_token)
        .get(`playlists/${playlist.id}/tracks?${query}`)
        .then((res) => {
          if (mounted) {
            setLoadMore(false);
            setTracks((tracks) => tracks.concat(res.data.items));
            setNextQuery(res.data.next);
          }
        })
        .catch((_) => {
          console.log("error");
        });
    }

    return () => (mounted = false);
  }, [access_token, playlist, tracks, loadMore, nextQuery]);

  return (
    <Box>
      <Typography align="center" color="secondary">
        Created by: {playlist?.owner?.id}
      </Typography>
      <List>
        {tracks &&
          tracks.map((track, i) => (
            <Box key={track.track && track.track.uri + i}>
              <TrackListItem track={track.track} />
              <Divider />
            </Box>
          ))}
      </List>

      {loadMore && (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {nextQuery && (
        <Box display="flex" justifyContent="center" padding={3}>
          <Button onClick={() => setLoadMore(true)}>Load more</Button>
        </Box>
      )}
    </Box>
  );
}
