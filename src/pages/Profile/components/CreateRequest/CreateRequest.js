import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { actions } from 'shared/stores';

import api from 'utils/api';
import {
  Box,
  Fab
} from '@material-ui/core';

import { Send } from '@material-ui/icons';

import UsernameDialog from 'shared/components/UsernameDialog';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(8),
    right: 0,
    margin: theme.spacing(2),
  },
  fabIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function CreateRequest() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [username, setUsername] = useState(undefined);

  const [openDialog, setOpenDialog] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);
  const [failureMessage, setFailureMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);

  const createRequest = (e) => {
    e.preventDefault();
    setOpenDialog(false);

    var data = new FormData();
    data.append("requesting", username);

    api.post('createRequest', data)
    .then(res => {
      dispatch(actions.setMyRequests(null));
      if (res && res.data && res.data.Success) {
        setSuccessMessage(`Requested to ctrl.${username}`);
        setOpenSuccess(true);
      } else {
        setFailureMessage(`Could not request ctrl.${username}`);
        setFailureMessage(res.data.Message);
        setOpenFailure(true);
      }
    }).catch((_) => {
      dispatch(actions.setMyRequests(null));
      setFailureMessage(`Could not request ctrl.${username}`);
      setOpenFailure(true);
    });
  };

  return (
    <Box>
      <Fab
        aria-label="give-consent"
        variant="extended"
        color="secondary"
        onClick={() => {setOpenDialog(true)}}
      >
        <Send className={classes.fabIcon} />
        Request
      </Fab>

      <UsernameDialog
        open={openDialog}
        setOpen={setOpenDialog}
        submit={createRequest}
        onChange={(e) => {setUsername(e.target.value.toLowerCase())}}
        buttonText="Send request"
        buttonColor="secondary"
        failureMessage={failureMessage}
        successMessage={successMessage}
        openSuccess={openSuccess}
        setOpenSuccess={setOpenSuccess}
        openFailure={openFailure}
        setOpenFailure={setOpenFailure}
      />
    </Box>
  );
}