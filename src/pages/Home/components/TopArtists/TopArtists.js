import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectors } from "shared/stores";

import { Box, List, Divider, Card, ListSubheader } from "@material-ui/core";

import ArtistListItem from "shared/components/ArtistListItem";
import spotify from "utils/spotify";
import { sameDay } from "utils/utils";

const { getMeAccessToken } = selectors;

export default function TopArtists() {
  const accessToken = useSelector((state) => getMeAccessToken(state));

  const storedTopArtists = JSON.parse(localStorage.getItem("top_artists"));
  let artistsDefaultState = false;
  if (
    storedTopArtists &&
    sameDay(new Date(storedTopArtists.timestamp), new Date())
  ) {
    artistsDefaultState = storedTopArtists.artists;
  }

  const [artists, setArtists] = useState(artistsDefaultState);

  useEffect(() => {
    let mounted = true;
    if (accessToken && !artists) {
      spotify(accessToken)
        .get(`me/top/artists?limit=5&time_range=short_term`)
        .then((res) => {
          if (mounted) {
            setArtists(res.data.items);
            localStorage.setItem(
              "top_artists",
              JSON.stringify({
                timestamp: new Date(),
                artists: res.data.items,
              })
            );
          }
        })
        .catch((_) => {
          console.log("error");
        });
    }

    return () => (mounted = false);
  }, [accessToken, artists]);

  return (
    <Card>
      <Box padding={2}>
        <List>
          <ListSubheader>My Top Artists</ListSubheader>
          {artists &&
            artists.map((artist, i) => (
              <Box key={artist.uri + i}>
                <ArtistListItem artist={artist} />
                <Divider />
              </Box>
            ))}
        </List>
      </Box>
    </Card>
  );
}
