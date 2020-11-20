import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "shared/stores";

import { Box, Dialog, Typography, Button, Link } from "@material-ui/core";

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
    <Box display="flex" justifyContent="center">
      <Link onClick={() => setWarning(true)} component="div">
        Delete all my data
      </Link>

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
