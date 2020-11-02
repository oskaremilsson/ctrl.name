import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { actions } from 'shared/stores';

import api from 'utils/api';
import { Box, TextField, Button, Snackbar } from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';

export default function GiveConsent() {
  const dispatch = useDispatch();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [username, setUsername] = useState(undefined);

  const [openFailure, setOpenFailure] = useState(false);
  const [failureMessage, setFailureMessage] = useState(undefined);

  const uploadConsent = (e) => {
    e.preventDefault();
    var data = new FormData();
    data.append("allow_user", username);
  
    api.post("giveConsent", data)
    .then(res => {
      dispatch(actions.setMyConsents(null));
      if (res && res.data && res.data.Success) {
        setOpenSuccess(true);
      } else {
        setFailureMessage(res.data.Message);
        setOpenFailure(true);
      }
    }).catch((_) => {
      setFailureMessage(`Could not give consent to ${username}`);
      setOpenFailure(true);
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

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openSuccess}
        autoHideDuration={6000}
        onClose={() => {setOpenSuccess(false)}}
      >
        <Alert
          elevation={6}
          severity="success"
          variant="filled"
        >
         { `You're now allowing ${username} control` }
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openFailure}
        autoHideDuration={6000}
        onClose={() => {setOpenFailure(false)}}
      >
        <Alert
          elevation={6}
          severity="info"
          variant="filled"
        >
          { failureMessage }
        </Alert>
      </Snackbar>
    </form>
  );
}