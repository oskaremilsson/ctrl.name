import React, {useState, useEffect} from 'react';
import {
  Box,
  Dialog,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar
} from '@material-ui/core';

import { Add as AddIcon } from '@material-ui/icons';

import api from 'utils/api';
import spotify from 'utils/spotify';

const getConsents = (setConsents) => {
  api.post('getConsents')
  .then(res => {
    setConsents(res.data.Consents);
  });
};

export default function SwitchCurrentMe(props) {
  const { history, me, currentMe, access_token, setCurrentMe, setTokenFetched, openSwitch, setOpenSwitch } = props;
  const [consents, setConsents] = useState(undefined);

  const myAvatarAlt = (me && me.id) || 'current';
  const myAvatarImg = me && me.images && me.images[0] && me.images[0].url;

  const switched = (username) => {
    spotify(access_token).get(`users/${username}`)
    .then(res => {
      setCurrentMe(res.data);
      setTokenFetched(false);
      setOpenSwitch(false);
    });
  };

  useEffect(() => {
    if (!consents) {
      getConsents(setConsents);
    }
  }, [consents]);

  return (
    <Box>
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
    </Box>
  );
}
