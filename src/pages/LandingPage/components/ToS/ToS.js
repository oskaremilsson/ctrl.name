import React from "react";
import { Box, Typography } from "@material-ui/core";

import FullscreenDialog from "shared/components/FullscreenDialog";

export default function ToS({ open, setOpen }) {
  return (
    <FullscreenDialog open={open} setOpen={setOpen} title="Terms & Conditions">
      <Box padding={2}>
        <Typography paragraph>
          Work in progress. I guess some text regarding what ctrl.name store and
          how will be here.
        </Typography>
        <Typography paragraph>
          On login ctrl.name will store your Spotify username. A refresh token
          to Spotify will be stored encrypted.
        </Typography>
        <Typography paragraph>
          You can, whenever, choose to delete all data stored by ctrl.name in
          settings.
        </Typography>
      </Box>
    </FullscreenDialog>
  );
}
