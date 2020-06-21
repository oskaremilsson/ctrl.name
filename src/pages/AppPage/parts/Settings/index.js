import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Box, IconButton, Typography } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

import GiveConsent from '../../parts/GiveConsent';

export default function Settings(props) {
  const theme = useTheme();
  const { me, setShowSettings } = props;

  return (
    <Box
      minHeight="100vh"
      width="100%"
      position="fixed"
      top={0}
      left={0}
      zIndex="10"
      style={{'backgroundColor': theme.palette.background.default}}
      padding={1}
    >
      <Box
        position="fixed"
        top={1}
        right={1}
      >
        <IconButton onClick={() => setShowSettings(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box marginBottom={1}>
        <Typography component="h5" variant="h5">
          Settings for { me.id }
        </Typography>
      </Box>

      <GiveConsent />
    </Box>
  );
}