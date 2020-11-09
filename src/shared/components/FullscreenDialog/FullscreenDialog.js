import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar
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
  image: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

export default function FullscreenDialog(props) {
  const classes = useStyles();
  const { children, setOpen, title, image, headerContent } = props;

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
        <Box
          display="flex"
          justifyContent="center"
        >
          { image &&
            <Avatar
              className={classes.image}
              alt={title}
              src={image}
              variant="rounded"
            />
          }

          { headerContent &&
            <Typography>
              { headerContent }
            </Typography>
          }

        </Box>
        { children }
      </Box>
    </Box>
  );
}
