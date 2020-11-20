import React from "react";

import { Box, Button } from "@material-ui/core";

import headerImage from "assets/header_img.jpg";

export default function LandingPage() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Box
        maxWidth="600px"
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <img src={headerImage} alt="header_img" width="100%" />
        <Button
          variant="contained"
          color="primary"
          href={`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_SPOTIFY_REDIRECT_URI}&scope=${process.env.REACT_APP_SPOTIFY_SCOPE}`}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
