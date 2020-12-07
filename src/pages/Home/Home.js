import React from "react";
import { Grid, Container } from "@material-ui/core";

import Controller from "shared/components/Controller";
import TopTracks from "./components/TopTracks";
import TopArtists from "./components/TopArtists";

export default function Home() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Container maxWidth="xs" disableGutters>
          <Controller />
        </Container>
      </Grid>

      <Grid item xs={12}>
        <TopArtists />
      </Grid>

      <Grid item xs={12}>
        <TopTracks />
      </Grid>
    </Grid>
  );
}
