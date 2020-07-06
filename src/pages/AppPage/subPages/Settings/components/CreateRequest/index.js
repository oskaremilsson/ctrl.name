import React, { useState} from 'react';

import api from '../../../../../../utils/api';
import { Box, TextField, Button, Snackbar, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

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
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
        message={`You requested to control ${username}`}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={(e) => handleClose(e, 'undo')}>
              UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openFailure}
        autoHideDuration={6000}
        message={failureMessage}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => { setOpenFailure(false) }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Box>
  );
}