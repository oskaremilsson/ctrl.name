import React, { useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Fab } from '@material-ui/core';

import { SupervisedUserCircle } from '@material-ui/icons';

import Controller from './components/Controller';
import SwitchCurrentMe from './components/SwitchCurrentMe';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(8),
    right: 0,
    margin: theme.spacing(2),
  },
  fabIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const [openSwitch, setOpenSwitch] = useState(false);

  return (
    <Box>
      <Container maxWidth="xs">
        <Controller />
      </Container>

      <Fab
        className={classes.fab}
        aria-label="switch"
        variant="extended"
        color="primary"
        onClick={() => { setOpenSwitch(true) }}
      >
        <SupervisedUserCircle className={classes.fabIcon} />
        Switch ctrl
      </Fab>

      <SwitchCurrentMe
        openSwitch={openSwitch}
        setOpenSwitch={setOpenSwitch}
        {...props}
      />
    </Box>
  );
}