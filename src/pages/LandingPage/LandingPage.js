import React, { useState } from "react";
import {
  Box,
  Card,
  Container,
  Button,
  Link,
  Typography,
} from "@material-ui/core";

import GdprConsent from "./components/GdprConsent";
import ToS from "./components/ToS";
import Controller from "shared/components/Controller";
import About from "shared/components/About";

import headerImage from "assets/header_img.jpg";
import demoPlayers from "assets/demoPlayers.json";

export default function LandingPage() {
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [openToS, setOpenToS] = useState(false);

  const demo = demoPlayers[Math.floor(Math.random() * demoPlayers.length)];

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      flexDirection="column"
    >
      <Box marginTop={4} marginBottom={4} maxWidth={250}>
        <img src={headerImage} alt="header_img" width="100%" />
      </Box>

      <Button
        disabled={loginDisabled}
        variant="contained"
        color="primary"
        href={`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_SPOTIFY_REDIRECT_URI}&scope=${process.env.REACT_APP_SPOTIFY_SCOPE}`}
      >
        Sign in with Spotify
      </Button>

      <Box padding={1} marginBottom={5}>
        <Box display="flex" alignItems="center">
          <GdprConsent setLoginDisabled={setLoginDisabled} />
          <Box width={200}>
            <Typography variant="caption">
              I've read and agreed with the
              <Link
                component="button"
                onClick={() => {
                  setOpenToS(true);
                }}
              >
                terms and conditions
              </Link>
              .
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box marginLeft={2} marginRight={2}>
        <Container maxWidth="xs" disableGutters>
          <Controller demo={demo} />
        </Container>
      </Box>

      <Box margin={2}>
        <Container maxWidth="xs" disableGutters>
          <Card>
            <About />
          </Card>
        </Container>
      </Box>

      <ToS open={openToS} setOpen={setOpenToS} />
    </Box>
  );
}
