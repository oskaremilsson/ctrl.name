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
  Card,
  CardMedia,
} from "@material-ui/core";

import { strip_tags } from "locutus/php/strings";
import { Close as CloseIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "fixed",
    background: theme.palette.background.default,
  },
  image: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  card: {
    width: "100%",
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullscreenDialog(props) {
  const classes = useStyles();
  const { children, open, setOpen, title, image, headerContent } = props;

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
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box padding={2}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          {image && (
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={image}
                title={title}
              />
            </Card>
          )}
          <Box padding={2}>
            {headerContent && (
              <Typography display="inline">
                {strip_tags(headerContent)}
              </Typography>
            )}
          </Box>
        </Box>
        {children}
      </Box>
    </Dialog>
  );
}
