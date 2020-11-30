import React, { useState } from "react";
import { Box, Container, IconButton } from "@material-ui/core";

import ProfileHeader from "./components/ProfileHeader";
import GiveConsent from "./components/GiveConsent";
import CreateRequest from "./components/CreateRequest";
import ConsentRequests from "./components/ConsentRequests";
import MyRequests from "./components/MyRequests";
import MyConsentList from "./components/MyConsentList";
import ConsentList from "./components/ConsentList";
import Settings from "./components/Settings";

import { Settings as SettingsIcon } from "@material-ui/icons";

export default function Profile() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <Box>
      <Box paddingBottom={3} paddingTop={3}>
        <IconButton onClick={() => setSettingsOpen(true)} color="inherit">
          <SettingsIcon />
        </IconButton>

        <Box marginBottom={5}>
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

        <ConsentRequests />

        <MyRequests />

        <MyConsentList />

        <ConsentList />
      </Box>

      <Settings open={settingsOpen} setOpen={setSettingsOpen} />
    </Box>
  );
}
