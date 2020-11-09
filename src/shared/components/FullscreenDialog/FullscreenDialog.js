import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';

import { Close as CloseIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'sticky',
    background: theme.palette.background.default,
  },
  title: {
    flex: 1,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
}));

export default function FullscreenDialog(props) {
  const classes = useStyles();
  const { children, title, setOpen } = props;

  return (
    <Box>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setOpen(false)} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            { title }
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        padding={2}
        marginBottom={5}
      >
        { children }
      </Box>
    </Box>
  );
}
