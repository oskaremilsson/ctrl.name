import React, { useState} from 'react';

import api from '../../../../../../utils/api';
import { Box, TextField, Button, Snackbar, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

export default function GiveConsent() {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [username, setUsername] = useState(undefined);

  const [openFailure, setOpenFailure] = useState(false);
  const [failureMessage, setFailureMessage] = useState(undefined);

  const handleClose = (e, reason) => {
    switch(reason) {
      case 'undo':
        console.log('remove consent');
        var data = new FormData();
        data.append("disallow_user", username);

        api.post('revokeConsent', data)
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

  const uploadConsent = (e) => {
    e.preventDefault();
    console.log('uploading:', username);

    var data = new FormData();
    data.append("allow_user", username);

    api.post('giveConsent', data)
    .then(res => {
      console.log(res);
      if (res && res.data && res.data.Success) {
        setOpenSuccess(true);
      } else {
        setFailureMessage(res.data.Message);
        setOpenFailure(true);
      }
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
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
        message={`You're now allowing ${username} control`}
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
    </form>
  );
}