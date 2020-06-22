import React, { useState} from 'react';

import api from '../../../../../../utils/api';
import { Box, TextField, Button, Snackbar, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

export default function CreateRequest() {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [username, setUsername] = useState(undefined);

  const handleClose = (e, reason) => {
    switch(reason) {
      case 'undo':
        console.log('remove request');
        /*var data = new FormData();
        data.append("disallow_user", username);

        api.post('revokeConsent', data)
        .then(res => {
          console.log(res);
          setRequests(false);
        });*/
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
    setOpenSuccess(true);
    setUsername(username);

    var data = new FormData();
    data.append("requesting", username);

    api.post('createRequest', data)
    .then(res => {
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
    </Box>
  );
}