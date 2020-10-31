import React, { useState} from 'react';

import api from 'utils/api';
import { Box, TextField, Button, Snackbar, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

import Alert from '@material-ui/lab/Alert';

export default function CreateRequest() {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [username, setUsername] = useState(undefined);

  const [openFailure, setOpenFailure] = useState(false);
  const [failureMessage, setFailureMessage] = useState(undefined);

  const handleClose = (e, reason) => {
    switch(reason) {
      case 'undo':
        console.log('remove request');
        var data = new FormData();
        data.append("username", username);

        api.post('removeRequest', data)
        .then(res => {
          console.log(res);
          setUsername(undefined);
        });
        break;
      default:
        setTimeout(() => {
          setUsername(undefined);
        }, 500);
        break;
    }

    setOpenSuccess(false);
  };

  const createRequest = (e) => {
    e.preventDefault();
    console.log('uploading:', username);
    setUsername(username);

    var data = new FormData();
    data.append("requesting", username);

    api.post('createRequest', data)
    .then(res => {
      if (res && res.data && res.data.Success) {
        setOpenSuccess(true);
      } else {
        setFailureMessage(res.data.Message);
        setOpenFailure(true);
      }

      console.log(res);
    }).catch((_) => {
      setFailureMessage(`Could not create request for ${username}`);
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
         { `Requested to control ${username}` }
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