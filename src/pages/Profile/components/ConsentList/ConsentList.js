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

const { getMyConsents } = selectors;

export default function ConsentList() {
  const dispatch = useDispatch();
  const consents = useSelector((state) => getMyConsents(state));
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);
  const [username, setUsername] = useState(undefined);

  const revokeConsent = (username) => {
    setUsername(username);

    var data = new FormData();
    data.append("disallow_user", username);

    api.post('revokeConsent', data)
    .then(_ => {
      setOpenSuccess(true);
      dispatch(actions.setMyConsents(null));
    }).catch(_ => {
      dispatch(actions.setMyConsents(null));
      setOpenFailure(true);
    });
  };


  useEffect(() => {
    if (!consents) {
      api.post('getMyConsents')
      .then(res => {
        dispatch(actions.setMyConsents(res.data && res.data.Consents));
      });
    }
  }, [dispatch, consents]);


  return (
    <Box margin={2} >
      { consents && consents.length > 0 &&
        <Card>
          <Box padding={1}>
            <List>
              <Box paddingLeft={2}>
                <Typography variant="h5">
                  Consent{ consents && consents.length > 1 && 's' } given to ctrl.me
                </Typography>
              </Box>
              { consents.map((consent) => (
                <ListItem key={consent}>
                  <IconButton aria-label="revoke access" onClick={() => {revokeConsent(consent)}}>
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
        autoHideDuration={6000}
        onClose={() => {setOpenSuccess(false)}}
      >
        <Alert
          elevation={6}
          severity="success"
          variant="filled"
        >
         { `Revoked access for ${username}` }
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openFailure}
        autoHideDuration={6000}
        onClose={() => {setOpenSuccess(false)}}
      >
        <Alert
          elevation={6}
          severity="error"
          variant="filled"
        >
         { `Could not revoke access, try again!` }
        </Alert>
      </Snackbar>
    </Box>
  );
}