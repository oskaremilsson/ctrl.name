import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from 'shared/stores';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Card } from '@material-ui/core';
import { ColorExtractor } from 'react-color-extractor';
import invert from 'invert-color';
import hexToRgba from 'hex-to-rgba';

import CardContent from './components/CardContent';

import coverart from 'assets/coverart.png';

const { getSpotifyPlayer } = selectors;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: theme.spacing(2),
  },
  cover: {
    width: '100%',
    height: '100%',
    minHeight: '100%',
    minWidth: '100%',
  },
}));

export default function Controller(props) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const player = useSelector((state) => getSpotifyPlayer(state));

  const [color, setColor] = useState('#535b5c');
  const textColor = invert(color, true);

  const album = player && player.item && player.item.album;
  const albumName = album && album.name;
  const albumCover = album && album.images && album.images[0] && album.images[0].url;

  return (
    <Box
      display="flex"
      width="100%"
    >
      { albumCover &&
        <ColorExtractor
          src={albumCover}
          maxColors={2}
          getColors={colors => { colors && setColor(colors[0]) }}
        />
      }
      <Card
        className={classes.root}
        style={{
          background: `radial-gradient(circle at center, ${hexToRgba(color, '1')} 0%, ${hexToRgba(color, '0.85')} 45%, ${hexToRgba(color, '0.6')} 100%)`,
        }}
      >
        <img
          width="100%"
          src={albumCover || coverart}
          alt={albumName}
        />

        <CardContent
          textColor={textColor}
          player={player}
          {...props}
        />
      </Card>

    </Box>
  );
}
