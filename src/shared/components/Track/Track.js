import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "shared/stores";

import {
  makeStyles,
  Box,
  Dialog,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  Avatar,
  Divider,
  Tooltip,
  Link,
} from "@material-ui/core";

import Rating from "@material-ui/lab/Rating";

import { QueueMusic } from "@material-ui/icons";

import ArtistListItem from "shared/components/ArtistListItem";
import QueueUnavailableTooltip from "shared/components/QueueUnavailableTooltip";
import spotify from "utils/spotify";

const useStyles = makeStyles((theme) => ({
  rating: {
    color: theme.palette.primary.main,
  },
}));

const { getSpotifyPlayer, getCurrentMeAccessToken } = selectors;

export default function Track({ open, setOpen, track, queueTrack }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const player = useSelector((state) => getSpotifyPlayer(state));
  const access_token = useSelector((state) => getCurrentMeAccessToken(state));

  const [artists, setArtists] = useState([]);
  const [openRatingInfo, setOpenRatingInfo] = useState(false);

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
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <Box padding={3}>
        <Box paddingLeft={2}>
          <Typography variant="caption" color="textSecondary">
            {track?.album?.release_date?.split("-")[0]}
          </Typography>
        </Box>

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
              primary={
                <Typography
                  variant="body1"
                  color={track.is_local ? "textSecondary" : "textPrimary"}
                >
                  {track.name}
                </Typography>
              }
              disableTypography={true}
              secondary={
                <Tooltip
                  title="Popularity on spotify"
                  open={openRatingInfo}
                  onClose={() => setOpenRatingInfo(false)}
                  arrow
                  placement="top"
                >
                  <span onClick={() => setOpenRatingInfo(true)}>
                    <Rating
                      className={classes.rating}
                      name="popularity"
                      value={track.popularity / 20}
                      precision={0.5}
                      size="small"
                      readOnly
                    />
                  </span>
                </Tooltip>
              }
            />
          </ListItem>

          {artists.map((artist, i) => (
            <Box key={i}>
              <ArtistListItem artist={artist} />
              <Divider />
            </Box>
          ))}

          {queueTrack && (
            <Box marginTop={2}>
              <QueueUnavailableTooltip
                player={player}
                track={track}
                position="top"
              >
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!player}
                  onClick={() => {
                    queueTrack(track.uri);
                    setOpen(false);
                  }}
                  startIcon={<QueueMusic />}
                >
                  Queue track
                </Button>
              </QueueUnavailableTooltip>
            </Box>
          )}
          <Box marginTop={2}>
            <Link
              color="secondary"
              href={track?.external_urls?.spotify}
              target="_blank"
              rel="noreferrer"
            >
              Open in Spotify
            </Link>
          </Box>
        </List>
      </Box>
    </Dialog>
  );
}
