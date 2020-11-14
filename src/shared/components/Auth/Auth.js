import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import { Box, CircularProgress } from "@material-ui/core";

import api from "utils/api";

export default function Auth() {
  const location = useLocation();
  const history = useHistory();

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

        localStorage.setItem(
          "my_tokens",
          JSON.stringify({
            refresh_token: res.data.Refresh_token,
            access_token: res.data.Access_token,
          })
        );

        setRefreshToken(res.data.Refresh_token);
      });
    }

    if (refreshToken && !uploaded) {
      let data = new FormData();
      data.append("refresh_token", refreshToken);

      api.post("storeRefreshToken", data).then((res) => {
        setUploaded(true);

        history.replace("/");
      });
    }
  }, [code, loaded, history, refreshToken, uploaded]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <CircularProgress />
    </Box>
  );
}
