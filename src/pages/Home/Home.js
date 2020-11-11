import React from 'react';
import {
  Box,
  Container
} from '@material-ui/core';

import Controller from './components/Controller';
import TopTracks from './components/TopTracks';

export default function Home() {
  return (
    <Box>
      <Container maxWidth="xs">
        <Controller />
      </Container>

      <TopTracks />
    </Box>
  );
}