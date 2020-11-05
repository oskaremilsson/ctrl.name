import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions } from 'shared/stores';

import api from 'utils/api';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Card,
  Snackbar,
  IconButton,
  Typography
} from '@material-ui/core';
import { RemoveCircleOutline } from '@material-ui/icons';

import Alert from '@material-ui/lab/Alert';

const { getConsents } = selectors;

export default function MyConsentList() {
  const dispatch = useDispatch();
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


  useEffect(() => {
    if (!consents) {
      api.post('getConsents')
      .then(res => {
        dispatch(actions.setConsents(res.data && res.data.Consents));
      });
    }
  }, [dispatch, consents]);


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
                <ListItem key={consent}>
                  <IconButton aria-label="remove consent" onClick={() => {removeConsent(consent)}}>
                    <RemoveCircleOutline />
                  </IconButton>

                    <ListItemText primary={consent}/>
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