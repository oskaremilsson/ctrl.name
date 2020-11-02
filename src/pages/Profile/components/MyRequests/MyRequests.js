import React, { useEffect} from 'react';
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

import { RemoveCircleOutline } from '@material-ui/icons';

import api from 'utils/api';

const { getMyRequests } = selectors;

export default function MyRequests() {
  const dispatch = useDispatch();
  const myRequests = useSelector((state) => getMyRequests(state));
  
  const removeRequest = (username) => {
    var data = new FormData();
    data.append("username", username);

    api.post('removeRequest', data)
    .then(_ => {
      dispatch(actions.setMyRequests(false));
    });
  }

  useEffect(() => {
    if (!myRequests) {
      api.post('getMyRequests')
      .then(res => {
        dispatch(actions.setMyRequests(res.data && res.data.Requests));
      });
    }
  }, [myRequests, dispatch]);


  return (
    <Box margin={2}>
      { myRequests && myRequests.length > 0 &&
        <Card>
          <Box padding={1}>
            <List>
              <Box paddingLeft={2}>
                <Typography variant="h5">
                  My sent requests
                </Typography>
              </Box>
              { myRequests.map((request) => (
                <ListItem key={request}>
                  <IconButton aria-label="remove request" onClick={() => removeRequest(request)}>
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