import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "shared/stores";

import { Box, IconButton, Typography } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";

export default function Logout() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [execute, setExecute] = useState(undefined);

  useEffect(() => {
    if (execute) {
      dispatch(actions.logout());
      localStorage.clear();
      history.replace("/");
      window.location.reload();
    }
  }, [dispatch, history, execute]);

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <Box display="flex" flexDirection="column" alignItems="center">
        <IconButton onClick={() => setExecute(true)}>
          <ExitToApp />
        </IconButton>
        <Box marginTop={-1}>
          <Typography variant="caption">Logout</Typography>
        </Box>
      </Box>
    </Box>
  );
}
