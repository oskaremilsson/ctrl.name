import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "shared/stores";

import { Box, IconButton, Dialog, Typography, Button } from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";

import api from "utils/api";

export default function DeleteMyData() {
  const dispatch = useDispatch();

  const [warning, setWarning] = useState(false);
  const [execute, setExecute] = useState(undefined);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (execute) {
      api
        .post("deleteMyData")
        .then((_) => {
          dispatch(actions.logout());
          localStorage.clear();
          setDone(true);
        })
        .catch((_) => {
          console.log(_);
        });
    }
  }, [dispatch, execute]);

  return (
    <Box>
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton onClick={() => setWarning(true)} color="inherit">
            <DeleteForever />
          </IconButton>
          <Box marginTop={-1}>
            <Typography variant="caption" color="textSecondary">
              Delete my data
            </Typography>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={warning}
        onClose={() => {
          setWarning(false);
        }}
      >
        <Box padding={2}>
          <Typography>
            We will delete all data stored connected to your username. You are
            free to login again in future.
          </Typography>

          <Box marginTop={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setExecute(true);
              }}
            >
              Delete all my data
            </Button>
          </Box>
        </Box>
      </Dialog>

      <Dialog fullScreen open={done}>
        <Box padding={3}>
          <Box marginBottom={5}>
            <Typography variant="h2" color="primary" paragraph>
              Sad to see you go
            </Typography>
            <Typography variant="h5" paragraph>
              All your data stored by ctrl.name have been deleted.
            </Typography>
            <Typography variant="h5" color="secondary">
              {" "}
              See you later aligator!
            </Typography>
          </Box>

          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                window.location.reload();
              }}
            >
              Bye, bye
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
