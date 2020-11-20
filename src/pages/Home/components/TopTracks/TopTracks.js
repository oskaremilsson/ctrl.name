import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectors } from "shared/stores";

import { Box, List, Divider, Card, ListSubheader } from "@material-ui/core";

import TrackListItem from "shared/components/TrackListItem";
import spotify from "utils/spotify";
import { sameDay } from "utils/utils";

const { getMeAccessToken } = selectors;

export default function TopTracks() {
  const accessToken = useSelector((state) => getMeAccessToken(state));

  const storedTopTracks = JSON.parse(localStorage.getItem("top_tracks"));
  let tracksDefaultState = false;
  if (
    storedTopTracks &&
    sameDay(new Date(storedTopTracks.timestamp), new Date())
  ) {
    tracksDefaultState = storedTopTracks.tracks;
  }

  const [tracks, setTracks] = useState(tracksDefaultState);

  useEffect(() => {
    let mounted = true;
    if (accessToken && !tracks) {
      spotify(accessToken)
        .get(`me/top/tracks?limit=20&time_range=short_term`)
        .then((res) => {
          if (mounted) {
            setTracks(res.data.items);
            localStorage.setItem(
              "top_tracks",
              JSON.stringify({
                timestamp: new Date(),
                tracks: res.data.items,
              })
            );
          }
        })
        .catch((_) => {
          console.log("error");
        });
    }

    return () => (mounted = false);
  }, [accessToken, tracks]);

  return (
    <Box padding={2}>
      <Card>
        <Box padding={2}>
          <List>
            <ListSubheader>My Top Tracks</ListSubheader>
            {tracks &&
              tracks.map((track, i) => (
                <Box key={track.id + i}>
                  <TrackListItem track={track} />
                  <Divider />
                </Box>
              ))}
          </List>
        </Box>
      </Card>
    </Box>
  );
}
