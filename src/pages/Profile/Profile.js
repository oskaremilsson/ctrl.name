import React from "react";
import { Box, Container } from "@material-ui/core";

import ProfileHeader from "./components/ProfileHeader";
import GiveConsent from "./components/GiveConsent";
import CreateRequest from "./components/CreateRequest";
import ConsentRequests from "./components/ConsentRequests";
import MyRequests from "./components/MyRequests";
import MyConsentList from "./components/MyConsentList";
import ConsentList from "./components/ConsentList";

import Logout from "./components/Logout";

export default function Profile() {
  return (
    <Container maxWidth="md">
      <Box paddingBottom={3} paddingTop={3}>
        <Box textAlign="right">
          <Logout />
        </Box>

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
    </Container>
  );
}
