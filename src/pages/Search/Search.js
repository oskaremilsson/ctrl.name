import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from 'shared/stores';

import { makeStyles } from '@material-ui/core/styles';

import {
  Box,
  TextField,
  List,
  Divider,
  ListSubheader,
} from '@material-ui/core';

import TrackListItem from 'shared/components/TrackListItem';
import PlaylistListItem from 'shared/components/PlaylistListItem';
import ArtistListItem from 'shared/components/ArtistListItem';
import AlbumListItem from 'shared/components/AlbumListItem';

import spotify from 'utils/spotify';

const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: theme.palette.background.default,
  },
}));

const { getCurrentMeAccessToken } = selectors;

export default function Search() {
  const classes = useStyles();

  const access_token = useSelector((state) => getCurrentMeAccessToken(state));
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (access_token && searchQuery) {
      const q = encodeURIComponent(searchQuery); 
      spotify(access_token).get(`search?q=${q}&type=album,artist,playlist,track&market=from_token&limit=5`)
      .then(res => {
        if (mounted){
          setTracks(res.data && res.data.tracks && res.data.tracks.items);
          setPlaylists(res.data && res.data.playlists && res.data.playlists.items);
          setArtists(res.data && res.data.artists && res.data.artists.items);
          setAlbums(res.data && res.data.albums && res.data.albums.items);
        }
      }).catch( _ => {
        console.log('error');
      });
    }

    return () => mounted = false;
  }, [access_token, searchQuery]);

  return (
    <Box>
      <Box padding={2}>
        <TextField
          onChange={(e) => { setSearchQuery(e.target.value) }}
          onKeyPress={(e) => { if (e.key === "Enter") { e.target.blur(); }}}
          fullWidth
          margin="normal"
          label="Search"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </Box>

      <List className={classes.list}>
        { tracks.length > 0 &&
          <ListSubheader>Tracks</ListSubheader>
        }
        { tracks.map((track, i) => (
          <Box key={track && track.uri + i}>
            <TrackListItem track={track} />
            <Divider />
          </Box>
        ))}

        { artists.length > 0 &&
          <ListSubheader>Artists</ListSubheader>
        }
        { artists.map((artist, i) => (
          <Box key={artist.uri + i}>
            <ArtistListItem artist={artist} />
            <Divider />
          </Box>
        ))}

        { albums.length > 0 &&
          <ListSubheader>Albums</ListSubheader>
        }
        { albums.map((album, i) => (
          <Box key={album.uri + i}>
            <AlbumListItem album={album} />
            <Divider />
          </Box>
        ))}

        { playlists.length > 0 &&
          <ListSubheader>Playlists</ListSubheader>
        }
        { playlists.map((playlist, i) => (
          <Box key={playlist.id + i}>
            <PlaylistListItem playlist={playlist} />
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
}
