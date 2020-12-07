import React, { useState } from "react";
import { Box, Container, Button, Link, Typography } from "@material-ui/core";

import GdprConsent from "./components/GdprConsent";

import headerImage from "assets/header_img.jpg";
import FullscreenDialog from "shared/components/FullscreenDialog";
import Controller from "shared/components/Controller";

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
      <Box marginLeft={2} marginRight={2} maxWidth={200}>
        <Controller demo={demo} />
      </Box>

      <Box maxWidth="600px" marginBottom={5}>
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
              I've read and agreed with the{" "}
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

      <FullscreenDialog
        open={openToS}
        setOpen={setOpenToS}
        title="Terms & Conditions"
      >
        <Typography paragraph>
          Work in progress. I guess some text regarding what ctrl.name store and
          how will be here.
        </Typography>
        <Typography paragaraph>
          On login ctrl.name will store your Spotify username. A refresh token
          to Spotify will be stored encrypted.
        </Typography>
        <Typography paragaraph>
          You can, whenever, choose to delete all data stored by ctrl.name in
          settings.
        </Typography>
      </FullscreenDialog>
    </Box>
  );
}
