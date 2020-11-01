import React from 'react';
import { Box, Typography, Divider } from '@material-ui/core';

import GiveConsent from './components/GiveConsent';
import CreateRequest from './components/CreateRequest';
import ConsentRequests from './components/ConsentRequests';
import ConsentList from './components/ConsentList';

export default function Settings(props) {
  const { me } = props;

  return (
    <Box
      padding={1}
    >

      <Box marginBottom={1}>
        <Typography component="h5" variant="h5">
          Settings for { me.id }
        </Typography>
      </Box>

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