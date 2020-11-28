import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "shared/stores";

import {
  Box,
  Dialog,
  Typography,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@material-ui/core";

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
          dispatch(actions.logoutWithoutReload());
          setDone(true);
        })
        .catch((_) => {
          console.log(_);
        });
    }
  }, [dispatch, execute]);

  return (
    <Box>
      <List>
        <ListItem button onClick={() => setWarning(true)}>
          <ListItemAvatar>
            <DeleteForever color="primary" />
          </ListItemAvatar>
          <ListItemText
            disableTypography={true}
            primary={
              <Typography variant="body1" color="primary">
                Delete all my data
              </Typography>
            }
          />
        </ListItem>
        <Divider />
      </List>

      <Dialog
        open={warning}
        onClose={() => {
          setWarning(false);
        }}
      >
        <Box padding={2}>
          <Typography variant="h5" paragraph>
            Delete all my data stored by ctrl.name
          </Typography>
          <Typography>
            It's possible to change your mind in the future, simply login again!
          </Typography>

          <Box marginTop={2} display="flex" justifyContent="space-between">
            <Button
              color="primary"
              onClick={() => {
                setExecute(true);
              }}
            >
              Delete data
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                setWarning(false);
              }}
            >
              Keep data
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
                document.cookie =
                  "gdpr_consent= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
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
