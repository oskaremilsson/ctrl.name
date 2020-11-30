import React from "react";
import { Box } from "@material-ui/core";

import Logout from "./components/Logout";
import DeleteMyData from "./components/DeleteMyData";

import FullscreenDialog from "shared/components/FullscreenDialog";

export default function Settings({ open, setOpen }) {
  return (
    <FullscreenDialog open={open} setOpen={setOpen} title="Settings">
      <Box padding={2}>
        <Box marginBottom={6}>
          <DeleteMyData />
        </Box>
        <Logout />
      </Box>
    </FullscreenDialog>
  );
}
