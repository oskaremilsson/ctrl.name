import React, { useState, useEffect } from 'react';
import Controller from '../../components/Controller';
import SwitchCurrentMe from './parts/SwitchCurrentMe';
import GiveConsent from './parts/GiveConsent';
import { Box } from '@material-ui/core'

import api from '../../utils/api';

const getAccessToken = (username, setAccessToken, setTokenFetched) => {
  var data = new FormData();
  data.append("username", username);

  api.post('getAccessToken', data)
  .then(res => {
    setAccessToken(res.data.Access_token);
    setTokenFetched(true);
  });
};

export default function AppPage(props) {
  const { me } = props;
  
  const [access_token, setAccessToken] = useState(undefined);
  const [currentMe, setCurrentMe] = useState(me.id);
  const [tokenFetched, setTokenFetched] = useState(false);

  useEffect(() => {
    if (!tokenFetched) {
      getAccessToken(currentMe, setAccessToken, setTokenFetched);
    }
  }, [currentMe, tokenFetched]);


  return (
    <Box className="AppPage">
      <SwitchCurrentMe
        me={me}
        currentMe={currentMe}
        setCurrentMe={setCurrentMe}
        setTokenFetched={setTokenFetched}
      />

      <GiveConsent />

      <Controller access_token={access_token}/>
    </Box>
  );
}