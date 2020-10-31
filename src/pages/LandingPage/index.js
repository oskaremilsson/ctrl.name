import React from 'react';

import config from 'config/config.json';
import { Box, Button } from '@material-ui/core';

export default function LandingPage() {
  return (
    <Box 
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      flexDirection="column"
    >
      <Button
        variant="contained"
        color="primary"
        href={ `https://accounts.spotify.com/authorize?client_id=${config.CLIENT_ID}&response_type=code&redirect_uri=${config.SPOTIFY_REDIRECT_URI}&scope=${config.SPOTIFY_SCOPE}` }
      >
        Login
      </Button>
    </Box>
  );
}