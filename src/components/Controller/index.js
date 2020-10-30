import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from 'shared/stores';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { ColorExtractor } from 'react-color-extractor';
import invert from 'invert-color';

import { OverflowDetector } from 'react-overflow';
import Marquee from 'react-double-marquee';
import hexToRgba from 'hex-to-rgba';

import PlayButton from './components/PlayButton';
import SkipButton from './components/SkipButton';

import coverart from 'assets/coverart.png';

import './style.css';

const { getSpotifyPlayer } = selectors;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    margin: theme.spacing(2),
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    whiteSpace: 'noWrap',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 160,
    minWidth: 160,
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
  marquee: {
    overflowX: 'hidden',
  }
}));

export default function Controller(props) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const player = useSelector((state) => getSpotifyPlayer(state));

  const [color, setColor] = useState('#535b5c');
  const [scrollTitle, setScrollTitle] = useState(false);
  const [scrollArtist, setScrollArtist] = useState(false);
  const [oldSong, setOldSong] = useState(false);
  const textColor = invert(color, true);

  const handleTitleOverflow = (isOverflowed) => {
    if (isOverflowed) {
      setScrollTitle(true);
    }
  }

  const handleArtistOverflow = (isOverflowed) => {
    if (isOverflowed) {
      setScrollArtist(true);
    }
  }

  const album = player && player.item && player.item.album;
  const albumName = album && album.name;
  const albumCover = album && album.images && album.images[0] && album.images[0].url;

  const song = player && player.item;
  const songTitle = song && song.name;

  const artists = song && song.artists && song.artists.map((artist)=> artist.name).join(', ');

  if (player) {
    if (oldSong !== player.item.uri) {
      setOldSong(player.item.uri);
      setScrollArtist(false);
      setScrollTitle(false);
    }
  }

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
          background: `radial-gradient(circle at top right, ${hexToRgba(color, '1')} 0%, ${hexToRgba(color, '0.7')} 35%, ${hexToRgba(color, '0.2')} 100%)`,
        }}
      >
        <CardMedia
          className={classes.cover}
          image={albumCover || coverart}
          title={albumName}
        />

          <Box
            className={classes.details}
            minHeight="160px"
            style={{overflowX: "hidden"}}
          >

          <CardContent className={classes.content}>
            <OverflowDetector onOverflowChange={handleTitleOverflow}>
              {
                scrollTitle ?
                  <Typography variant="h6" style={{ color: textColor }}>
                    <Marquee
                      delay={0}
                      direction="left"
                    >
                      { songTitle || "No active device found" }
                    </Marquee>
                  </Typography>
                :
                  <Typography variant="h6" style={{ color: textColor }}>
                    { songTitle || "No active device found" }
                  </Typography>
              }
            </OverflowDetector>

            <OverflowDetector onOverflowChange={handleArtistOverflow}>
              {
                scrollArtist ?
                  <Box className={classes.marquee}>
                    <Typography variant="subtitle1" style={{ color: textColor }}>
                      <Marquee
                        delay={0}
                        direction="left"
                      >
                        { artists }
                      </Marquee>
                    </Typography>
                  </Box>
                :
                  <Typography variant="subtitle1" style={{ color: textColor }}>
                    { artists }
                  </Typography>
              }
            </OverflowDetector>
          </CardContent>

          <Box className={classes.controls}>
            <SkipButton
              {...props}
              player={player}
              action={"previous"}
              icon={"skip_previous"}
              color={textColor}
            />
            <PlayButton
              {...props}
              player={player}
              color={textColor}
            />
            <SkipButton
              {...props}
              player={player}
              action={"next"}
              icon={"skip_next"}
              color={textColor}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
