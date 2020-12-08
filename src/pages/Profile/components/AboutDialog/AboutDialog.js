import React from "react";
import { Box } from "@material-ui/core";

import FullscreenDialog from "shared/components/FullscreenDialog";
import About from "shared/components/About";

export default function AboutDialog({ open, setOpen }) {
  return (
    <FullscreenDialog open={open} setOpen={setOpen}>
      <Box padding={2}>
        <About />
      </Box>
    </FullscreenDialog>
  );
}
