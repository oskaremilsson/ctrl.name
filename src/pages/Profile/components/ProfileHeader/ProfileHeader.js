import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

export default function ProfileHeader(props) {
  const classes = useStyles();
  const { me } = props;

  const username = (me && me.id) || 'user';
  const myAvatarImg = me && me.images && me.images[0] && me.images[0].url;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop={2}
    >
      <Avatar alt={username} src={myAvatarImg} className={classes.avatar} />
      <Typography variant="h5">
        { username }
      </Typography>
    </Box>
  );
}