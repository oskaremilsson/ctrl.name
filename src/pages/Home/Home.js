import React from "react";
import { Box, Container } from "@material-ui/core";

import Controller from "./components/Controller";
import TopTracks from "./components/TopTracks";
import TopArtists from "./components/TopArtists";

export default function Home() {
  return (
    <Box>
      <Container maxWidth="xs">
        <Controller />
      </Container>

      <TopArtists />
      <TopTracks />
    </Box>
  );
}
