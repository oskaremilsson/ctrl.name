import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { actions } from "shared/stores";

import api from "utils/api";
import { Box, Fab } from "@material-ui/core";

import { AddCircle } from "@material-ui/icons";

import UsernameDialog from "shared/components/UsernameDialog";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(8),
    right: 0,
    margin: theme.spacing(2),
  },
  fabIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function GiveConsent() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [username, setUsername] = useState(undefined);

  const [openDialog, setOpenDialog] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);
  const [failureMessage, setFailureMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);

  const uploadConsent = (e) => {
    e.preventDefault();
    setOpenDialog(false);
    if (!username) {
      return;
    }

    var data = new FormData();
    data.append("allow_user", username);
    setUsername(undefined);

    api
      .post("giveConsent", data)
      .then((res) => {
        dispatch(actions.setMyConsents(null));
        if (res && res.data && res.data.Success) {
          setOpenSuccess(true);
          setSuccessMessage(`Consent given to ${username}`);
        } else {
          setFailureMessage(`Could not give consent to ${username}`);
          setFailureMessage(res.data.Message);
          setOpenFailure(true);
        }
      })
      .catch((_) => {
        dispatch(actions.setMyConsents(null));
        setFailureMessage(`Could not give consent to ${username}`);
        setOpenFailure(true);
      });
  };

  return (
    <Box>
      <Fab
        aria-label="give-consent"
        variant="extended"
        color="primary"
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        <AddCircle className={classes.fabIcon} />
        Consent
      </Fab>

      <UsernameDialog
        open={openDialog}
        setOpen={setOpenDialog}
        submit={uploadConsent}
        onChange={(e) => {
          setUsername(e.target.value.toLowerCase());
        }}
        buttonText="Give consent"
        buttonColor="primary"
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
