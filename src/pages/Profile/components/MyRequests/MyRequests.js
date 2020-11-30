import React from "react";
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
import { CancelScheduleSend } from "@material-ui/icons";

import api from "utils/api";

const { getMyRequests } = selectors;

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

export default function MyRequests() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const myRequests = useSelector((state) => getMyRequests(state));

  const removeRequest = (username) => {
    var data = new FormData();
    data.append("username", username);

    api.post("removeRequest", data).then((_) => {
      dispatch(actions.setMyRequests(null));
    });
  };

  return (
    <Box>
      {myRequests && myRequests.length > 0 && (
        <Card>
          <Box padding={1}>
            <List>
              <Box paddingLeft={2}>
                <Typography variant="h5">
                  My sent request{myRequests && myRequests.length > 1 && "s"}
                </Typography>
              </Box>
              {myRequests.map((request) => (
                <ListItem key={request.id}>
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
                      onClick={() => removeRequest(request.id)}
                      edge="end"
                      aria-label="remove request"
                    >
                      <CancelScheduleSend />
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
