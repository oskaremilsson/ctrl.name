import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from 'shared/stores';

import {
  Box,
  List,
  Divider,
  Button,
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
    let mounted = true;
    if (access_token && loadMore) {
      const query = nextQuery ? nextQuery.split('?')[1] : 'limit=50';
      spotify(access_token).get(`playlists/${playlist.id}/tracks?limit=50&${query}`)
      .then(res => {
        if(mounted){
          setLoadMore(false);
          setTracks(tracks => tracks.concat(res.data.items));
          setNextQuery(res.data.next);
        }
      }).catch( _ => {
        console.log('error');
      });
    }

    return () => mounted = false;
  }, [access_token, playlist, tracks, loadMore, nextQuery]);

  return (
    <Box>
      <FullscreenDialog
        setOpen={setOpenPlaylist}
        title={playlist && playlist.name}
        image={playlist && playlist.images && playlist.images.length > 0 && playlist.images[0].url}
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

        {
          nextQuery &&
          <Box
            display="flex"
            justifyContent="center"
            padding={3}
          >
            <Button onClick={() => setLoadMore(true)}>Load more</Button>
          </Box>
        }
      </FullscreenDialog>
    </Box>
  );
}
