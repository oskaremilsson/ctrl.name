import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from 'shared/stores';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Card, CardMedia, Avatar } from '@material-ui/core';
import { ColorExtractor } from 'react-color-extractor';
import invert from 'invert-color';
import hexToRgba from 'hex-to-rgba';

import CardContent from './components/CardContent';
import SwitchCurrentMe from './components/SwitchCurrentMe';

import coverart from 'assets/coverart.png';

const { getSpotifyPlayer } = selectors;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    margin: theme.spacing(2),
    position: 'relative',
  },
  cover: {
    width: 160,
    minWidth: 160,
  },
  avatar: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
    cursor: 'pointer',
  },
}));

export default function Controller(props) {
  const { currentMe } = props;
  const theme = useTheme();
  const classes = useStyles(theme);
  const player = useSelector((state) => getSpotifyPlayer(state));

  const [color, setColor] = useState('#535b5c');
  const textColor = invert(color, true);

  const [openSwitch, setOpenSwitch] = useState(false);

  const avatarAlt = (currentMe && currentMe.id) || 'current';
  const avatarImg = currentMe && currentMe.images && currentMe.images[0] && currentMe.images[0].url;

  const album = player && player.item && player.item.album;
  const albumName = album && album.name;
  const albumCover = album && album.images && album.images[0] && album.images[0].url;

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
      <Card
        className={classes.root}
        style={{
          background: `radial-gradient(circle at center, ${hexToRgba(color, '1')} 0%, ${hexToRgba(color, '0.85')} 45%, ${hexToRgba(color, '0.6')} 100%)`,
        }}
      >
        <CardMedia
          className={classes.cover}
          image={albumCover || coverart}
          title={albumName}
        />

        <Box
          position="absolute"
          bottom="5px"
          left="5px"
        >
          <Avatar
            alt={avatarAlt}
            src={avatarImg}
            className={classes.avatar}
            onClick={() => { setOpenSwitch(true) }}
          />
        </Box>

        <CardContent
          textColor={textColor}
          player={player}
        />
      </Card>

      <SwitchCurrentMe
        openSwitch={openSwitch}
        setOpenSwitch={setOpenSwitch}
        {...props}
      />
    </Box>
  );
}
