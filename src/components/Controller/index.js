import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from 'shared/stores';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { ColorExtractor } from 'react-color-extractor'

import PlayButton from './components/PlayButton';
import SkipButton from './components/SkipButton';

import './style.css';

const { getSpotifyPlayer } = selectors;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 160,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function Controller(props) {
  const player = useSelector((state) => getSpotifyPlayer(state));
  console.log(player);

  const [color, setColor] = useState();
  const theme = useTheme();
  const classes = useStyles(theme);

  const album = player && player.item && player.item.album;
  const albumName = album && album.name;
  const albumCover = album && album.images && album.images[0] && album.images[0].url;

  const song = player && player.item;
  const songTitle = song && song.name;

  const artists = song && song.artists && song.artists.map((artist)=> artist.name).join(', ');
  
  return (
    <Box
      display="flex"
      marginBottom={4}
      width="100%"
    >
      { albumCover &&
        <ColorExtractor
          src={albumCover}
          maxColors={2}
          getColors={colors => { colors && setColor(colors[0]) }}
        />
      }
      <Card className={classes.root} style={{background: color}}>
        <CardMedia
          className={classes.cover}
          image={albumCover || "/no_album.png"}
          title={albumName}
        />
        <Box className={classes.details} minHeight="160px">
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              { songTitle || "No active device" }
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              { artists }
            </Typography>
          </CardContent>

          <Box className={classes.controls}>
            <SkipButton
            {...props}
            player={player}
            action={"previous"}
            icon={"skip_previous"}
          />
          <PlayButton {...props} player={player} />
          <SkipButton
            {...props}
            player={player}
            action={"next"}
            icon={"skip_next"}
          />
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
