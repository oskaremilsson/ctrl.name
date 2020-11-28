import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "shared/stores";

import {
  Box,
  Dialog,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@material-ui/core";

import Rating from "@material-ui/lab/Rating";
import { Whatshot } from "@material-ui/icons";

import ArtistListItem from "shared/components/ArtistListItem";
import spotify from "utils/spotify";

const { getSpotifyPlayer, getCurrentMeAccessToken } = selectors;

export default function Track({ open, setOpen, track, queueTrack }) {
  const dispatch = useDispatch();
  const player = useSelector((state) => getSpotifyPlayer(state));
  const access_token = useSelector((state) => getCurrentMeAccessToken(state));

  const [artists, setArtists] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (access_token && track && open) {
      dispatch(actions.setSpotifyPlayerSync(true));

      const ids = track.artists.map((artist) => {
        return artist.id;
      });

      spotify(access_token)
        .get(`artists?ids=${ids.join(",")}`)
        .then((res) => {
          if (mounted) {
            setArtists(res.data && res.data.artists);
          }
        })
        .catch((_) => {
          console.log("error");
        });
    }
    return () => (mounted = false);
  }, [dispatch, access_token, track, open]);

  if (!open) {
    return <></>;
  }

  let image;
  if (track.album && track.album.images) {
    if (track.album.images.length > 1) {
      image = track.album.images[track.album.images.length - 1].url;
    }
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Box padding={3}>
        <List>
          <ListItem>
            <ListItemAvatar>
              {image ? (
                <Avatar variant="rounded" alt={track.name} src={image} />
              ) : (
                <Avatar variant="circle" alt={track.name}>
                  {track.track_number}
                </Avatar>
              )}
            </ListItemAvatar>
            <ListItemText
              primary={track.name}
              secondary={
                <Rating
                  name="popularity"
                  value={track.popularity / 20}
                  precision={0.5}
                  icon={<Whatshot />}
                  size="small"
                  readOnly
                />
              }
            />
          </ListItem>

          {artists.map((artist, i) => (
            <Box key={i}>
              <ArtistListItem artist={artist} />
              <Divider />
            </Box>
          ))}

          <Box marginTop={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={!player}
              onClick={() => queueTrack(track.uri)}
            >
              Queue track
            </Button>
          </Box>
        </List>
      </Box>
    </Dialog>
  );
}
