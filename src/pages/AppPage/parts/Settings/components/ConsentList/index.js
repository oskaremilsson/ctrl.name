import React, { useEffect, useState} from 'react';

import api from '../../../../../../utils/api';
import { Box, List, ListItem, ListItemText,
         Button, CircularProgress, Snackbar, IconButton } from '@material-ui/core';
import { Close as CloseIcon, Block as BlockIcon } from '@material-ui/icons';

export default function ConsentList() {
  const [consents, setConsents] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [username, setUsername] = useState(undefined);

  const handleClose = (e, reason) => {
    switch(reason) {
      case 'undo':
        var data = new FormData();
        data.append("allow_user", username);

        api.post('giveConsent', data)
        .then(res => {
          console.log(res);
          setConsents(false);
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

  const revokeConsent = (username) => {
    console.log('uploading:', username);
    setOpenSuccess(true);
    setUsername(username);

    var data = new FormData();
    data.append("disallow_user", username);

    api.post('revokeConsent', data)
    .then(res => {
      console.log(res);
      setConsents(false);
    }).catch(_ => {
      setConsents(false);
    });
  };


  useEffect(() => {
    if (!consents) {
      api.post('getMyConsents')
      .then(res => {
        console.log(res);
        setConsents(res.data && res.data.Consents);
      });
    }
  }, [consents]);


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
              <IconButton size="medium" aria-label="revoke access" color="secondary" onClick={() => {revokeConsent(consent)}}>
                <BlockIcon fontSize="medium" />
              </IconButton>

                <ListItemText primary={consent}/>
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
        message={`Revoked access for ${username}`}
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