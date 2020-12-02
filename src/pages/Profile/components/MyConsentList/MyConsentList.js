import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "shared/stores";

import api from "utils/api";
import {
  makeStyles,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Card,
  Snackbar,
  IconButton,
  Typography,
} from "@material-ui/core";

import { RemoveCircleOutline } from "@material-ui/icons";

import Alert from "@material-ui/lab/Alert";

const { getMyConsents } = selectors;

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

export default function MyConsentList() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const consents = useSelector((state) => getMyConsents(state));
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);
  const [username, setUsername] = useState(undefined);

  const revokeConsent = (username) => {
    setUsername(username);

    var data = new FormData();
    data.append("disallow_user", username);

    api
      .post("revokeConsent", data)
      .then((_) => {
        setOpenSuccess(true);
        dispatch(actions.setMyConsents(null));
      })
      .catch((_) => {
        dispatch(actions.setMyConsents(null));
        setOpenFailure(true);
      });
  };

  return (
    <Box>
      {consents && consents.length > 0 && (
        <Card>
          <Box padding={1}>
            <List>
              <Box paddingLeft={2}>
                <Typography variant="h5">
                  Consent{consents && consents.length > 1 && "s"} given to
                  ctrl.me
                </Typography>
              </Box>
              {consents.map((consent) => (
                <ListItem key={consent.id}>
                  <ListItemAvatar>
                    <Avatar
                      alt={consent.id}
                      src={consent && consent.images && consent.images[0].url}
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
                        {consent.display_name}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        className={classes.inline}
                        color="textSecondary"
                      >
                        ctrl.{consent.id}
                      </Typography>
                    }
                  />

                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => revokeConsent(consent.id)}
                      edge="end"
                      aria-label="revoke consent"
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

      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={openSuccess}
        autoHideDuration={3000}
        onClose={() => {
          setOpenSuccess(false);
        }}
      >
        <Alert elevation={6} severity="success" variant="filled">
          {`Revoked access for ${username}`}
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={openFailure}
        autoHideDuration={3000}
        onClose={() => {
          setOpenSuccess(false);
        }}
      >
        <Alert elevation={6} severity="error" variant="filled">
          {`Could not revoke access, try again!`}
        </Alert>
      </Snackbar>
    </Box>
  );
}
