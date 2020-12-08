import React, { useState } from "react";
import { Box, Grid, IconButton } from "@material-ui/core";

import ProfileHeader from "./components/ProfileHeader";
import GiveConsent from "./components/GiveConsent";
import CreateRequest from "./components/CreateRequest";
import ConsentRequests from "./components/ConsentRequests";
import MyRequests from "./components/MyRequests";
import MyConsentList from "./components/MyConsentList";
import ConsentList from "./components/ConsentList";
import Settings from "./components/Settings";
import AboutDialog from "./components/AboutDialog";

import { Settings as SettingsIcon, Help as HelpIcon } from "@material-ui/icons";

export default function Profile() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <Box>
      <Box paddingBottom={3} paddingTop={3}>
        <Box marginBottom={5}>
          <IconButton onClick={() => setAboutOpen(true)} color="inherit">
            <HelpIcon />
          </IconButton>
          <IconButton onClick={() => setSettingsOpen(true)} color="inherit">
            <SettingsIcon />
          </IconButton>
          <ProfileHeader />
        </Box>

        <Box display="flex" justifyContent="center" marginBottom={5}>
          <Box margin={1}>
            <GiveConsent />
          </Box>

          <Box margin={1}>
            <CreateRequest />
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ConsentRequests />
          </Grid>

          <Grid item xs={12}>
            <MyRequests />
          </Grid>

          <Grid item xs={12}>
            <MyConsentList />
          </Grid>

          <Grid item xs={12}>
            <ConsentList />
          </Grid>
        </Grid>
      </Box>

      <Settings open={settingsOpen} setOpen={setSettingsOpen} />
      <AboutDialog open={aboutOpen} setOpen={setAboutOpen} />
    </Box>
  );
}
