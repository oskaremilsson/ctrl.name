import React from "react";

import {
  makeStyles,
  Box,
  Dialog,
  Slide,
  Typography,
  Card,
  CardMedia,
  Fab,
  Grid,
  Container,
} from "@material-ui/core";

import { strip_tags } from "locutus/php/strings";
import { Close as CloseIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
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

  if (!open) {
    return <></>;
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      TransitionComponent={Transition}
    >
      <Box position="fixed" bottom={16} zIndex={2} width="100%">
        <Box display="flex" justifyContent="center">
          <Fab
            color="primary"
            aria-label="close"
            onClick={() => setOpen(false)}
            size="small"
          >
            <CloseIcon />
          </Fab>
        </Box>
      </Box>
      <Box marginBottom={6}>
        {image && (
          <Card className={classes.card}>
            <CardMedia className={classes.media} image={image} title={title} />
          </Card>
        )}
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box marginTop={2}>
                <Typography color="primary" variant="h3" align="left">
                  {title}
                </Typography>
              </Box>
            </Grid>

            {headerContent && (
              <Grid item xs={12}>
                <Typography display="inline">
                  {strip_tags(headerContent)}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Container>
        {children}
      </Box>
    </Dialog>
  );
}
