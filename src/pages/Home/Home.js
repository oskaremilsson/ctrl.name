import React, { useState }  from 'react';
import { useSelector } from 'react-redux';
import { selectors } from 'shared/stores';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Fab, Avatar } from '@material-ui/core';

import Controller from './components/Controller';
import SwitchCurrentMe from './components/SwitchCurrentMe';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(8),
    right: 0,
    margin: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(1),
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const { getCurrentMe } = selectors;

export default function Home(props) {
  const classes = useStyles();
  const [openSwitch, setOpenSwitch] = useState(false);
  const currentMe = useSelector((state) => getCurrentMe(state));

  const myAvatarAlt = (currentMe && currentMe.id) || 'ctrl.current';
  const myAvatarImg = currentMe && currentMe.images && currentMe.images[0] && currentMe.images[0].url;

  return (
    <Box>
      <Container maxWidth="xs">
        <Controller />
      </Container>

      <Fab
        className={classes.fab}
        aria-label="switch"
        variant="extended"
        color="secondary"
        onClick={() => { setOpenSwitch(true) }}
      >
        <Avatar alt={myAvatarAlt} src={myAvatarImg} className={classes.avatar}/>
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