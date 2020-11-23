import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "shared/stores";

import { Box, List, Divider } from "@material-ui/core";

import TrackListItem from "shared/components/TrackListItem";
import spotify from "utils/spotify";

const { getCurrentMeAccessToken } = selectors;

export default function Album({ album }) {
  const dispatch = useDispatch();
  const access_token = useSelector((state) => getCurrentMeAccessToken(state));
  const [tracks, setTracks] = useState(undefined);

  useEffect(() => {
    let mounted = true;
    if (access_token && !tracks) {
      dispatch(actions.setSpotifyPlayerSync(true));
      spotify(access_token)
        .get(`albums/${album.id}/tracks`)
        .then((res) => {
          if (mounted) {
            setTracks(res.data.items);
          }
        })
        .catch((_) => {
          console.log("error");
        });
    }

    return () => (mounted = false);
  }, [dispatch, access_token, album, tracks]);

  return (
    <Box>
      <List>
        {tracks &&
          tracks.map((track, i) => (
            <Box key={track && track.uri + i}>
              <TrackListItem track={track} avatarVariant="circle" />
              <Divider />
            </Box>
          ))}
      </List>
    </Box>
  );
}
