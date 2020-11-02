import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { actions } from 'shared/stores';

import { Box, TextField, Button, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import api from 'utils/api';

export default function CreateRequest() {
  const dispatch = useDispatch();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [username, setUsername] = useState(undefined);

  const [openFailure, setOpenFailure] = useState(false);
  const [failureMessage, setFailureMessage] = useState(undefined);

  const createRequest = (e) => {
    e.preventDefault();
    setUsername(username);

    var data = new FormData();
    data.append("requesting", username);

    api.post('createRequest', data)
    .then(res => {
      if (res && res.data && res.data.Success) {
        setOpenSuccess(true);
        dispatch(actions.setMyRequests(false));
      } else {
        setFailureMessage(res.data.Message);
        setOpenFailure(true);
      }
    }).catch((_) => {
      setFailureMessage(`Could not request ctrl.${username}`);
      setOpenFailure(true);
    });
    e.target.reset();
  };


  return (
    <Box>
      <form
        onSubmit={createRequest}
        noValidate
        autoComplete="off"
      >
        <Box
          display="flex"
          alignItems="center"
        >
          <TextField
            id="request-username"
            label="username"
            variant="outlined"
            onChange={(e) => {setUsername(e.target.value)}}
          />
          <Button type="submit" color="primary">
            Request
          </Button>
        </Box>
      </form>

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
         { `Requested to ctrl.${username}` }
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
    </Box>
  );
}