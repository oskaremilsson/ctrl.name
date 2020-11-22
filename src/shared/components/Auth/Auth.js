import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import { Box, CircularProgress, Typography } from "@material-ui/core";

import api from "utils/api";

export default function Auth() {
  const location = useLocation();
  const history = useHistory();

  const gdprConsent = document?.cookie
    ?.split("; ")
    ?.find((row) => row.startsWith("gdpr_consent"))
    ?.split("=")[1];

  const query = queryString.parse(location.search);
  const code = query && query.code;

  const [loaded, setLoaded] = useState(false);
  const [refreshToken, setRefreshToken] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  useEffect(() => {
    if (code && !loaded) {
      let data = new FormData();
      data.append("code", code);

      api.post("codeExchange", data).then((res) => {
        setLoaded(true);
        localStorage.setItem("refresh_token", res.data.Refresh_token);
        setRefreshToken(res.data.Refresh_token);
      });
    }
  }, [code, loaded]);

  useEffect(() => {
    if (refreshToken && !uploaded && gdprConsent) {
      let data = new FormData();
      data.append("gdpr_consent", gdprConsent);

      api.post("storeRefreshToken", data).then((_) => {
        setUploaded(true);
        history.replace("/");
      });
    }
  }, [refreshToken, uploaded, history, gdprConsent]);

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
