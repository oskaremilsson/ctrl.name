import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from 'shared/stores';

import {
  Box,
  List,
  Divider,
  CircularProgress
} from '@material-ui/core';

import FullscreenDialog from 'shared/components/FullscreenDialog';
import TrackListItem from 'shared/components/TrackListItem';
import spotify from 'utils/spotify';

const { getCurrentMeAccessToken } = selectors;

export default function Playlist(props) {
  const access_token = useSelector((state) => getCurrentMeAccessToken(state));
  const { playlist, setOpenPlaylist } = props;

  const [tracks, setTracks] = useState([]);
  const [nextQuery, setNextQuery] = useState(undefined);
  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    if (access_token && loadMore) {
      const query = nextQuery ? nextQuery.split('?')[1] : '';
      setLoadMore(false);
      spotify(access_token).get(`playlists/${playlist.id}/tracks?${query}`)
      .then(res => {
        setTracks(tracks => tracks.concat(res.data.items));
        setNextQuery(res.data.next);
        if (res.data.next) {
          setLoadMore(true);
        }
      }).catch( _ => {
        console.log('error');
      });
    }
  }, [access_token, playlist, tracks, loadMore, nextQuery]);

  return (
    <Box>
      <FullscreenDialog
        setOpen={setOpenPlaylist}
        title={playlist && playlist.name}
      >
        <List>
          {tracks && tracks.map((track, i) => (
            <Box key={track.track && track.track.uri + i}>
              <TrackListItem track={track.track} />
              <Divider />
            </Box>
          ))}
        </List>

        { loadMore &&
          <Box
            display="flex"
            justifyContent="center"
          >
            <CircularProgress />
          </Box>
      }
      </FullscreenDialog>
    </Box>
  );
}
