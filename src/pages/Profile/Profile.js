import React from 'react';
import { Box, Divider } from '@material-ui/core';

import ProfileHeader from './components/ProfileHeader';
import GiveConsent from './components/GiveConsent';
import CreateRequest from './components/CreateRequest';
import ConsentRequests from './components/ConsentRequests';
import ConsentList from './components/ConsentList';

export default function Profile(props) {
  return (
    <Box padding={2} >

      <ProfileHeader {...props} />

      <GiveConsent />

      <Divider />

      <CreateRequest />

      <Divider />

      <ConsentRequests />

      <Divider />

      <ConsentList />

    </Box>
  );
}