import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "shared/stores";

import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Card,
  IconButton,
  Typography,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { Check as CheckIcon, RemoveCircleOutline } from "@material-ui/icons";

import api from "utils/api";

const { getRequests } = selectors;

const useStyles = makeStyles((theme) => ({
  title: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  inline: {
    display: "inline",
  },
}));

export default function ConsentRequests() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const requests = useSelector((state) => getRequests(state));

  const allowRequest = (username) => {
    console.log("uploading:", username);

    var data = new FormData();
    data.append("allow_user", username);

    api
      .post("acceptRequest", data)
      .then((_) => {
        dispatch(actions.setRequests(false));
        dispatch(actions.setMyConsents(false));
      })
      .catch((_) => {
        dispatch(actions.setRequests(false));
      });
  };

  const rejectRequest = (username) => {
    var data = new FormData();
    data.append("username", username);

    api.post("removeRequest", data).then((_) => {
      dispatch(actions.setRequests(false));
    });
  };

  useEffect(() => {
    if (!requests) {
      api.post("getRequests").then((res) => {
        dispatch(actions.setRequests(res.data && res.data.Requests));
      });
    }
  }, [requests, dispatch]);

  return (
    <Box margin={2}>
      {requests && requests.length > 0 && (
        <Card>
          <Box padding={1}>
            <List>
              <Box paddingLeft={2}>
                <Typography variant="h5">Incoming requests</Typography>
              </Box>
              {requests.map((request) => (
                <ListItem key={request.id}>
                  <IconButton
                    aria-label="allow"
                    color="primary"
                    onClick={() => {
                      allowRequest(request.id);
                    }}
                  >
                    <CheckIcon />
                  </IconButton>

                  <ListItemAvatar>
                    <Avatar
                      alt={request.id}
                      src={request && request.images && request.images[0].url}
                    />
                  </ListItemAvatar>

                  <ListItemText
                    disableTypography={true}
                    primary={
                      <Typography
                        variant="body1"
                        className={classes.title}
                        color="textPrimary"
                      >
                        {request.display_name}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        className={classes.inline}
                        color="textSecondary"
                      >
                        ctrl.{request.id}
                      </Typography>
                    }
                  />

                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => rejectRequest(request.id)}
                      edge="end"
                      aria-label="reject request"
                    >
                      <RemoveCircleOutline />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        </Card>
      )}
    </Box>
  );
}
