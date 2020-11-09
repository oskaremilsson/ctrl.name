import React from 'react';
/* import { useSelector } from 'react-redux';
import { selectors } from 'shared/stores'; */

import {
  Box,
} from '@material-ui/core';

import FullscreenDialog from 'shared/components/FullscreenDialog';
// import TrackListItem from 'shared/components/TrackListItem';
// import spotify from 'utils/spotify';

// const { getCurrentMeAccessToken } = selectors;

export default function Artist(props) {
  //c onst access_token = useSelector((state) => getCurrentMeAccessToken(state));
  const { artist, setOpen } = props;

  return (
    <Box>
      <FullscreenDialog
        setOpen={setOpen}
        title={artist && artist.name}
        image={artist && artist.images && artist.images.length > 0 && artist.images[0].url}
      >
      </FullscreenDialog>
    </Box>
  );
}
