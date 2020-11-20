import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "shared/stores";

import api from "utils/api";

const { getMe, getCurrentMe } = selectors;

export default function RefreshTokens() {
  const dispatch = useDispatch();
  const history = useHistory();
  const my_tokens = JSON.parse(localStorage.getItem("my_tokens"));
  const me = useSelector((state) => getMe(state));
  const currentMe = useSelector((state) => getCurrentMe(state));
  const [execute, setExecute] = useState(true);
  const [refreshTimer, setRefreshTimer] = useState(undefined);

  useEffect(() => {
    if (my_tokens && me && currentMe && execute) {
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
            console.log(_);
            localStorage.clear();
            history.replace("/");
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
  }, [dispatch, my_tokens, history, me, currentMe, refreshTimer, execute]);

  return <></>;
}
