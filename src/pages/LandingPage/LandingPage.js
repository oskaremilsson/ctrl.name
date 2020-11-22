import React, { useState } from "react";
import { Box, Button, Link, Typography } from "@material-ui/core";

import GdprConsent from "./components/GdprConsent";

import headerImage from "assets/header_img.jpg";
import FullscreenDialog from "shared/components/FullscreenDialog";

export default function LandingPage() {
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [openToS, setOpenToS] = useState(false);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      flexDirection="column"
    >
      <Box maxWidth="600px">
        <img src={headerImage} alt="header_img" width="100%" />
      </Box>

      <Button
        disabled={loginDisabled}
        variant="contained"
        color="primary"
        href={`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_SPOTIFY_REDIRECT_URI}&scope=${process.env.REACT_APP_SPOTIFY_SCOPE}`}
      >
        Login
      </Button>

      <Box padding={1}>
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
        Some text regarding what ctrl.name store and how.
      </FullscreenDialog>
    </Box>
  );
}
