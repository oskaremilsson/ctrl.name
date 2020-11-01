import React from 'react';
import { Box } from '@material-ui/core';

import Controller from './components/Controller';

export default function Home(props) {
  return (
    <Box>
      <Controller
        {...props}
      />
    </Box>
  );
}