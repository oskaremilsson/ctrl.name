import React from "react";
import { Box, Typography } from "@material-ui/core";

import FullscreenDialog from "shared/components/FullscreenDialog";

export default function ToS({ open, setOpen }) {
  return (
    <FullscreenDialog open={open} setOpen={setOpen} title="Terms & Conditions">
      <Box padding={2}>
        <Typography paragraph>
          These Terms & Conditions is a work in progress and will be updated.
        </Typography>
        <Typography paragraph>
          On sign in ctrl.name will store your Spotify username and an encrypted
          "refresh token" to Spotify API.
        </Typography>
        <Typography paragraph>
          You can, whenever, choose to delete all data stored by ctrl.name in
          settings.
        </Typography>
      </Box>
    </FullscreenDialog>
  );
}
