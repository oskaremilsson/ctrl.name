import React from "react";
import { Box, CircularProgress, Typography } from "@material-ui/core";

export default function LoadingPage() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      flexDirection="column"
    >
      <CircularProgress />
      <Typography>Waking up server...</Typography>
    </Box>
  );
}
