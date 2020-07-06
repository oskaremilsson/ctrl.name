import React, { useState, useEffect } from 'react';
import AppPage from '../pages/AppPage';
import LandingPage from '../pages/LandingPage';
import LoadingPage from '../pages/LoadingPage';
import spotify from '../utils/spotify';

import { Box } from '@material-ui/core';

const verifyToken = (access_token, setMe, setLoggedIn, props) => {
  spotify(access_token).get('me')
  .then(res => {
    setLoggedIn(true);
    setMe(res.data);
  }).catch(_ => {
    localStorage.clear();
    props.history.replace('/');
  });
};

export default function Bouncer(props) {
  const my_tokens = JSON.parse(localStorage.getItem('my_tokens'));
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [me, setMe] = useState(undefined);

  useEffect(() => {
    if (my_tokens && !loggedIn) {
      verifyToken(my_tokens.access_token, setMe, setLoggedIn, props);
    }
  }, [my_tokens, loggedIn, props]);

  let component;
  if (my_tokens && !loggedIn) {
    component = <LoadingPage {...props} />
  } else if (me && loggedIn) {
    component = <AppPage me={me} {...props} />
  } else {
    component = <LandingPage {...props} />
  }

  return (
    <Box>
      { component }
    </Box>
  );
}
