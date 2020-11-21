import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
} from "@material-ui/core";

import { Close as CloseIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "sticky",
    background: theme.palette.background.default,
  },
  title: {
    flex: 1,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  image: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullscreenDialog(props) {
  const classes = useStyles();
  const {
    children,
    open,
    setOpen,
    title,
    image,
    headerContent,
    avatarVariant,
  } = props;

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpen(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box padding={2}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          {image && (
            <Avatar
              className={classes.image}
              alt={title}
              src={image}
              variant={avatarVariant || "rounded"}
            />
          )}
          <Box padding={2}>
            {headerContent && (
              <Typography display="inline">{headerContent}</Typography>
            )}
          </Box>
        </Box>
        {children}
      </Box>
    </Dialog>
  );
}
