import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions } from 'shared/stores';

import api from 'utils/api';
import {
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
  Typography
} from '@material-ui/core';

import { RemoveCircleOutline } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const { getConsents } = selectors;

const useStyles = makeStyles((theme) => ({
  title: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  inline: {
    display: 'inline',
  },
}));

export default function MyConsentList() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const consents = useSelector((state) => getConsents(state));
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);
  const [username, setUsername] = useState(undefined);

  const removeConsent = (username) => {
    setUsername(username);

    var data = new FormData();
    data.append("remove_user", username);

    api.post('removeConsent', data)
    .then(_ => {
      setOpenSuccess(true);
      dispatch(actions.setConsents(null));
    }).catch(_ => {
      dispatch(actions.setConsents(null));
      setOpenFailure(true);
    });
  };

  return (
    <Box margin={2}>
      { consents && consents.length > 0 &&
        <Card>
          <Box padding={1}>
            <List>
              <Box paddingLeft={2}>
                <Typography variant="h5">
                  Consent{ consents && consents.length > 1 && 's' } to ctrl.name
                </Typography>
              </Box>
              { consents.map((consent) => (
                <ListItem key={consent.id}>
                  <ListItemAvatar>
                    <Avatar alt={consent.id} src={consent && consent.images && consent.images[0].url} />
                  </ListItemAvatar>

                  <ListItemText
                    disableTypography={true}
                    primary={
                      <Typography
                        variant="body1"
                        className={classes.title}
                        color="textPrimary"
                      >
                        { consent.display_name }
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
                      onClick={() => removeConsent(consent.id)}
                      edge="end"
                      aria-label="remove consent"
                    >
                      <RemoveCircleOutline />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        </Card>
      }

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openSuccess}
        autoHideDuration={3000}
        onClose={() => {setOpenSuccess(false)}}
      >
        <Alert
          elevation={6}
          severity="success"
          variant="filled"
        >
         { `Removed consent for ctrl.${username}` }
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openFailure}
        autoHideDuration={3000}
        onClose={() => {setOpenSuccess(false)}}
      >
        <Alert
          elevation={6}
          severity="error"
          variant="filled"
        >
         { `Could not remove consent, try again!` }
        </Alert>
      </Snackbar>
    </Box>
  );
}