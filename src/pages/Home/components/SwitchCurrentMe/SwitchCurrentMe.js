import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions } from 'shared/stores';

import {
  Box,
  Dialog,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Snackbar
} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';

import { Add as AddIcon } from '@material-ui/icons';

import api from 'utils/api';
import spotify from 'utils/spotify';

const { getMeAccessToken, getMe, getCurrentMe, getConsents } = selectors;

export default function SwitchCurrentMe(props) {
  const dispatch = useDispatch();
  const { history, setTokenFetched, openSwitch, setOpenSwitch } = props;

  const currentMe = useSelector((state) => getCurrentMe(state));
  const me = useSelector((state) => getMe(state));
  const access_token = useSelector((state) => getMeAccessToken(state));
  const consents = useSelector((state) => getConsents(state));

  const [openFailure, setOpenFailure] = useState(undefined);

  const myAvatarAlt = (me && me.id) || 'current';
  const myAvatarImg = me && me.images && me.images[0] && me.images[0].url;

  const switched = (username) => {
    spotify(access_token).get(`users/${username}`)
    .then(res => {
      dispatch(actions.setCurrentMe(res.data));
      setTokenFetched(false);
      setOpenSwitch(false);
    }).catch(_ => {
      dispatch(actions.setConsents(undefined));
      setOpenFailure(username);
    });
  };

  useEffect(() => {
    if (!consents) {
      api.post('getConsents')
      .then(res => {
        dispatch(actions.setConsents(res.data.Consents));
      });
    }
  }, [dispatch, consents]);

  return (
    <Box>
      { me && currentMe &&
        <Dialog onClose={() => {setOpenSwitch(false)}} open={openSwitch}>
          <List>
            <ListItem
              button
              selected={me.id === currentMe.id}
              onClick={() => switched(me.id)} key={me.id}
            >
              <ListItemAvatar>
                <Avatar alt={myAvatarAlt} src={myAvatarImg} />
              </ListItemAvatar>
              <ListItemText primary={me.id} />
            </ListItem>

            { consents && consents.map((consent) => (
              <ListItem
                button
                selected={consent === currentMe.id}
                onClick={() => switched(consent)} key={consent}
              >
                <ListItemAvatar>
                  <Avatar alt="consent" />
                </ListItemAvatar>
                <ListItemText primary={consent} />
              </ListItem>
            ))}

            <ListItem button onClick={() => history.push('/profile')}>
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Create request" />
            </ListItem>
          </List>
        </Dialog>
      }

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={Boolean(openFailure)}
        autoHideDuration={6000}
        onClose={() => {setOpenFailure(false)}}
      >
        <Alert
          elevation={6}
          severity="error"
          variant="filled"
        >
          Failed to switch ctrl.{openFailure}
        </Alert>
      </Snackbar>
    </Box>
  );
}
