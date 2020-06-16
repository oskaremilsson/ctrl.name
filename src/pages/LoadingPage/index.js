import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

export default function LoadingPage() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <CircularProgress />
    </Box>
  );
}