import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "shared/stores";

import { Snackbar, Slide } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import api from "utils/api";

const { getMe, getCurrentMe, getCurrentMeAccessToken } = selectors;

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export default function RefreshTokens() {
  const dispatch = useDispatch();
  const history = useHistory();
  const refresh_token = localStorage.getItem("refresh_token");
  const me = useSelector((state) => getMe(state));

  const currentMe = useSelector((state) => getCurrentMe(state));
  const currentMeAccessToken = useSelector((state) =>
    getCurrentMeAccessToken(state)
  );

  const [execute, setExecute] = useState(true);
  const [refreshTimer, setRefreshTimer] = useState(undefined);
  const [openSnack, setOpenSnack] = useState(false);

  useEffect(() => {
    if (!currentMeAccessToken && currentMe && me) {
      let data = new FormData();
      data.append("username", currentMe.id);

      api
        .post("getAccessToken", data)
        .then((res) => {
          dispatch(actions.setCurrentMeAccessToken(res?.data?.Access_token));
          dispatch(actions.setSpotifyPlayerSync(true));
          setOpenSnack(true);
        })
        .catch((_) => {
          if (me.id !== currentMe.id) {
            // maybe delete the consent, it seems bad?
            // Maybe revoked refresh token? handle it on server.
            dispatch(actions.setCurrentMe(me));
            dispatch(actions.setCurrentMeAccessToken(undefined));
          } else {
            dispatch(actions.logout());
            localStorage.clear();
            history.replace("/");
            window.location.reload();
          }
        });
    }
  }, [dispatch, history, me, currentMe, currentMeAccessToken]);

  useEffect(() => {
    if (refresh_token && me && currentMe && execute) {
      setExecute(false);
      api
        .post("/getAccessToken")
        .then((res) => {
          dispatch(actions.setMeAccessToken(res?.data?.Access_token));
        })
        .catch((_) => {
          console.log(_);
          localStorage.clear();
          history.replace("/");
        });
      if (me.id !== currentMe.id) {
        let data = new FormData();
        data.append("username", currentMe.id);

        api
          .post("/getAccessToken", data)
          .then((res) => {
            dispatch(actions.setCurrentMeAccessToken(res?.data?.Access_token));
          })
          .catch((_) => {
            // maybe remove the consent instead?
            console.log(JSON.stringify(_));
          });
      }
    }

    if (!refreshTimer) {
      setRefreshTimer(
        setInterval(() => {
          setExecute(true);
        }, process.env.REACT_APP_TOKEN_REFRESH_MS_TIME || 900000)
      );
    }
  }, [dispatch, refresh_token, history, me, currentMe, refreshTimer, execute]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={openSnack}
      autoHideDuration={1500}
      onClose={() => {
        setOpenSnack(false);
      }}
      TransitionComponent={TransitionDown}
    >
      <Alert
        onClose={() => {
          setOpenSnack(false);
        }}
        elevation={6}
        severity="success"
        variant="filled"
      >
        Verified access
      </Alert>
    </Snackbar>
  );
}
