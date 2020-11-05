import React from 'react';

import {
  Box,
  TextField,
  Button,
  Dialog,
  Snackbar
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

export default function CreateRequest(props) {
  const {
    open,
    setOpen,
    submit,
    onChange,
    buttonText,
    buttonColor,
    successMessage,
    failureMessage,
    openSuccess,
    setOpenSuccess,
    openFailure,
    setOpenFailure
  } = props;

  return (
    <Box>
      <Dialog
        open={open}
        onClose={() => {setOpen(false)}}
      >
        <Box display="flex" padding={3} flexDirection="column">
          <TextField
            id="username"
            label="username"
            variant="outlined"
            onChange={onChange}
            autoComplete="off"
            autoCapitalize="none"
          />

          <Box marginBottom={2}></Box>

          <Button
            variant="contained"
            color={buttonColor}
            onClick={submit}
          >
            { buttonText }
          </Button>
        </Box>
      </Dialog>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openSuccess}
        autoHideDuration={3000}
        onClose={() => {setOpenSuccess(false)}}
      >
        <Alert
          elevation={6}
          severity="success"
          variant="filled"
        >
         { successMessage }
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openFailure}
        autoHideDuration={3000}
        onClose={() => {setOpenFailure(false)}}
      >
        <Alert
          elevation={6}
          severity="error"
          variant="filled"
        >
          { failureMessage }
        </Alert>
      </Snackbar>
    </Box>
  );
}