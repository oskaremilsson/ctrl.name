import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions } from 'shared/stores';

import {
  Box,
  Card,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@material-ui/core';

import { Check as CheckIcon, RemoveCircleOutline } from '@material-ui/icons';

import api from 'utils/api';

const { getRequests } = selectors;

export default function ConsentRequests() {
  const dispatch = useDispatch();
  const requests = useSelector((state) => getRequests(state));

  const allowRequest = (username) => {
    console.log('uploading:', username);

    var data = new FormData();
    data.append("allow_user", username);

    api.post('acceptRequest', data)
    .then(_ => {
      dispatch(actions.setRequests(false));
      dispatch(actions.setMyConsents(false));
    }).catch(_ => {
      dispatch(actions.setRequests(false));
    });
  };

  const rejectRequest = (username) => {
    var data = new FormData();
    data.append("username", username);

    api.post('removeRequest', data)
    .then(_ => {
      dispatch(actions.setRequests(false));
    });
  }

  useEffect(() => {
    if (!requests) {
      api.post('getRequests')
      .then(res => {
        dispatch(actions.setRequests(res.data && res.data.Requests));
      });
    }
  }, [requests, dispatch]);


  return (
    <Box margin={2}>
      { requests && requests.length > 0 &&
        <Card>
          <Box padding={1}>
            
              <List>
                <Typography variant="h5">
                  Incoming requests
                </Typography>
                { requests.map((request) => (
                  <ListItem key={request}>

                    <IconButton aria-label="allow" color="primary" onClick={() => {allowRequest(request)}}>
                      <CheckIcon />
                    </IconButton>

                    <IconButton aria-label="reject" onClick={() => {rejectRequest(request)}}>
                      <RemoveCircleOutline />
                    </IconButton>

                    <ListItemText primary={request}/>
                  </ListItem>
                ))}
              </List>
          </Box>
        </Card>
      }
    </Box>
  );
}