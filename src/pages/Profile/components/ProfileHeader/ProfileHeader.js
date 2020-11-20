import React from "react";
import { useSelector } from "react-redux";
import { selectors } from "shared/stores";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";

const { getMe } = selectors;

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

export default function ProfileHeader() {
  const classes = useStyles();
  const me = useSelector((state) => getMe(state));

  const name = me && me.display_name;
  const username = (me && me.id) || "user";
  const myAvatarImg = me && me.images && me.images[0] && me.images[0].url;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop={2}
    >
      <Box marginBottom={2}>
        <Avatar alt={username} src={myAvatarImg} className={classes.avatar} />
      </Box>
      <Typography variant="h4" color="primary">
        {name || username}
      </Typography>
      <Typography color="secondary">ctrl.{username}</Typography>
    </Box>
  );
}
