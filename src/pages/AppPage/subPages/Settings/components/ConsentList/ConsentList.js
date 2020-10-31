import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions } from 'shared/stores';

import api from 'utils/api';
import { Box, List, ListItem, ListItemText,
         CircularProgress, Snackbar, IconButton } from '@material-ui/core';
import { Block as BlockIcon } from '@material-ui/icons';

import Alert from '@material-ui/lab/Alert';

const { getConsents } = selectors;

export default function ConsentList() {
  const dispatch = useDispatch();
  const consents = useSelector((state) => getConsents(state));
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);
  const [username, setUsername] = useState(undefined);

  const revokeConsent = (username) => {
    setUsername(username);

    var data = new FormData();
    data.append("disallow_user", username);

    api.post('revokeConsent', data)
    .then(res => {
      setOpenSuccess(true);
      dispatch(actions.setConsents(null));
    }).catch(_ => {
      dispatch(actions.setConsents(null));
      setOpenFailure(true);
    });
  };


  useEffect(() => {
    if (!consents) {
      api.post('getMyConsents')
      .then(res => {
        dispatch(actions.setConsents(res.data && res.data.Consents));
      });
    }
  }, [dispatch, consents]);


  return (
    <Box
      display="flex"
      alignItems="center"
      marginTop={2}
    >
      { consents ? 
        <List>
          { consents.map((consent) => (
            <ListItem key={consent}>
              <IconButton size="small" aria-label="revoke access" color="secondary" onClick={() => {revokeConsent(consent)}}>
                <BlockIcon fontSize="small" />
              </IconButton>

                <ListItemText primary={consent}/>
            </ListItem>
          ))}
        </List>
        : <CircularProgress />
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