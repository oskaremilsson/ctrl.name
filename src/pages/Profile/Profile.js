import React from 'react';
import { Box, Container } from '@material-ui/core';

import ProfileHeader from './components/ProfileHeader';
import GiveConsent from './components/GiveConsent';
import CreateRequest from './components/CreateRequest';
import ConsentRequests from './components/ConsentRequests';
import MyRequests from './components/MyRequests';
import ConsentList from './components/ConsentList';

export default function Profile() {
  return (
    <Container maxWidth="md">
      <Box>
        <Box marginBottom={5}>
          <ProfileHeader />
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          marginBottom={5}
        >
          <Box margin={1}>
            <GiveConsent />
          </Box>

          <Box margin={1}>
            <CreateRequest />
          </Box>
        </Box>

        <MyRequests />

        <ConsentRequests />

        <ConsentList />

      </Box>
    </Container>
  );
}