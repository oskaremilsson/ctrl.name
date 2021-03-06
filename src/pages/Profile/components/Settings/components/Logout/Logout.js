import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "shared/stores";

import { Box, Button } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";

export default function Logout() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [execute, setExecute] = useState(undefined);

  useEffect(() => {
    if (execute) {
      dispatch(actions.logout());
    }
  }, [dispatch, history, execute]);

  return (
    <Box display="flex">
      <Button
        variant="contained"
        color="secondary"
        fullWidth={true}
        onClick={() => {
          setExecute(true);
        }}
        startIcon={<ExitToApp />}
      >
        Logout
      </Button>
    </Box>
  );
}
