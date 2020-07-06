import React, { useEffect, useState} from 'react';

import api from '../../../../../../utils/api';
import { Box, List, ListItem, ListItemText,
         Button, CircularProgress, Snackbar, IconButton } from '@material-ui/core';
import { Close as CloseIcon, Check as CheckIcon, Block as BlockIcon } from '@material-ui/icons';

export default function ConsentRequests() {
  const [requests, setRequests] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [username, setUsername] = useState(undefined);

  const handleClose = (e, reason) => {
    switch(reason) {
      case 'undo':
        var data = new FormData();
        data.append("disallow_user", username);

        api.post('revokeConsent', data)
        .then(res => {
          console.log(res);
          setRequests(false);
        });
        break;
      default:
        setTimeout(() => {
          setUsername(undefined);
        }, 500);
        break;
    }

    setOpenSuccess(false);
  };

  const allowRequest = (username) => {
    console.log('uploading:', username);
    setOpenSuccess(true);
    setUsername(username);

    var data = new FormData();
    data.append("allow_user", username);

    api.post('acceptRequest', data)
    .then(res => {
      console.log(res);
      setRequests(false);
    }).catch(_ => {
      setRequests(false);
    });
  };

  const rejectRequest = (username) => {
    console.log('rejecting:', username);

    var data = new FormData();
    data.append("username", username);

    api.post('removeRequest', data)
    .then(res => {
      console.log(res);
      setRequests(false);
    });
  }

  useEffect(() => {
    if (!requests) {
      api.post('getRequests')
      .then(res => {
        console.log(res);
        setRequests(res.data && res.data.Requests);
      });
    }
  }, [requests]);


  return (
    <Box
      display="flex"
      alignItems="center"
      marginTop={2}
    >
      { requests ? 
        <List>
          { requests.map((request) => (
            <ListItem key={request}>
              <IconButton size="large" aria-label="reject" color="secondary" onClick={() => {rejectRequest(request)}}>
                <BlockIcon fontSize="large" />
              </IconButton>

              <IconButton size="large" aria-label="allow" color="primary" onClick={() => {allowRequest(request)}}>
                <CheckIcon fontSize="large" />
              </IconButton>

              <ListItemText primary={request}/>
            </ListItem>
          ))}
        </List>
        : <CircularProgress />
      }

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
        message={`You allowed ${username} access to control your spotify`}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={(e) => handleClose(e, 'undo')}>
              UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Box>
  );
}