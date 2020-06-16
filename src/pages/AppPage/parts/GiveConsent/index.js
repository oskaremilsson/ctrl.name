import React, { useState} from 'react';

import api from '../../../../utils/api';
import { Box, TextField, Button } from '@material-ui/core';

export default function GiveConsent() {
  const [username, setUsername] = useState(false);

  const uploadConsent = (e) => {
    e.preventDefault();
    console.log('uploading:', username);

    var data = new FormData();
    data.append("allow_user", username);

    api.post('giveConsent', data)
    .then(res => {
      console.log(res);
    });
    e.target.reset();
  };


  return (
    <form
      onSubmit={uploadConsent}
      noValidate
      autoComplete="off"
    >
      <Box
        display="flex"
        alignItems="center"
      >
        <TextField
          id="consent-username"
          label="username"
          variant="outlined"
          onChange={(e) => {setUsername(e.target.value)}}
        />
        <Button type="submit" color="primary">
          Give consent
        </Button>
      </Box>
    </form>
  );
}