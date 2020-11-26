import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "shared/stores";

import {
  Box,
  Dialog,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
  Snackbar,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { Add as AddIcon } from "@material-ui/icons";

import spotify from "utils/spotify";

const { getMeAccessToken, getMe, getCurrentMe, getConsents } = selectors;

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

export default function SwitchCurrentMe({ open, setOpen }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const currentMe = useSelector((state) => getCurrentMe(state));
  const me = useSelector((state) => getMe(state));
  const access_token = useSelector((state) => getMeAccessToken(state));
  const consents = useSelector((state) => getConsents(state));

  const [openFailure, setOpenFailure] = useState(undefined);

  const myAvatarAlt = (me && me.id) || "current";
  const myAvatarImg = me && me.images && me.images[0] && me.images[0].url;

  const switched = (username) => {
    spotify(access_token)
      .get(`users/${username}`)
      .then((res) => {
        localStorage.setItem("selected_me", JSON.stringify(res.data));
        dispatch(actions.setCurrentMe(res.data));
        dispatch(actions.setCurrentMeAccessToken(undefined));
        setOpen(false);
      })
      .catch((_) => {
        console.log(_);
        setOpenFailure(username);
        dispatch(actions.setMeAccessToken(undefined));
      });
  };

  return (
    <Box>
      {me && currentMe && (
        <Dialog
          onClose={() => {
            setOpen(false);
          }}
          open={open}
        >
          <List>
            <ListItem
              button
              selected={me.id === currentMe.id}
              onClick={() => switched(me.id)}
              key={me.id}
            >
              <ListItemAvatar>
                <Avatar alt={myAvatarAlt} src={myAvatarImg} />
              </ListItemAvatar>
              <ListItemText
                disableTypography={true}
                primary={
                  <Typography
                    variant="body1"
                    className={classes.title}
                    color="textPrimary"
                  >
                    {me.display_name || me.id}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    className={classes.inline}
                    color="textSecondary"
                  >
                    ctrl.{me.id}
                  </Typography>
                }
              />
            </ListItem>

            {consents &&
              consents.map((consent) => (
                <ListItem
                  button
                  selected={consent.id === currentMe.id}
                  onClick={() => switched(consent.id)}
                  key={consent.id}
                >
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
                        {consent.display_name || consent.id}
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
                </ListItem>
              ))}

            <ListItem button onClick={() => history.push("/profile")}>
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Create request" />
            </ListItem>
          </List>
        </Dialog>
      )}

      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={Boolean(openFailure)}
        autoHideDuration={3000}
        onClose={() => {
          setOpenFailure(false);
        }}
      >
        <Alert elevation={6} severity="error" variant="filled">
          Failed to switch ctrl.{openFailure}
        </Alert>
      </Snackbar>
    </Box>
  );
}
