import React, { useState, useEffect } from 'react';
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

  const [color, setColor] = useState('#FFFFFF');
  const [scrollTitle, setScrollTitle] = useState(false);
  const [scrollArtist, setScrollArtist] = useState(false);
  const [isNewSong, setIsNewSong] = useState(true);
  const [oldSong, setOldSong] = useState(false);
  const textColor = invert(color, true);

  const handleTitleOverflow = (isOverflowed) => {
    console.log('overflow title detected', isOverflowed, isNewSong);
    if (isOverflowed) {
      setTimeout(() => {
        setScrollTitle(isOverflowed);
      }, 1000);
    }
  }

  const handleArtistOverflow = (isOverflowed) => {
    console.log("set artist scroll to:", isOverflowed, isNewSong);
    if (isOverflowed) {
      setTimeout(() => {
        setScrollArtist(isOverflowed);
      }, 1000);
    }
  }

  const album = player && player.item && player.item.album;
  const albumName = album && album.name;
  const albumCover = album && album.images && album.images[0] && album.images[0].url;

  const song = player && player.item;
  const songTitle = song && song.name;

  const artists = song && song.artists && song.artists.map((artist)=> artist.name).join(', ');

  useEffect(() => {
    if (song) {
      if (oldSong !== song.uri) {
        setOldSong(song.uri);
        setIsNewSong(true);
        setScrollArtist(false);
        setScrollTitle(false);
      }
    } else {
      setScrollArtist(false);
      setScrollTitle(false);
    }
  }, [song, oldSong]);

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
      <Card className={classes.root} style={{ background: color }}>
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
                  <Box className={classes.marquee}>
                    <span style={{
                      position: "absolute",
                      top: 0,
                      left: "-1px",
                      zIndex: 2,
                      width: "25px",
                      height: "32px",
                      backgroundImage: `linear-gradient(to left, ${hexToRgba(color, '0')}, ${hexToRgba(color, '1')} 90%)`
                    }}></span>
                    <Typography variant="h6" style={{ color: textColor }}>
                      <Marquee
                        delay={0}
                        direction="left"
                      >
                        { songTitle || "No active device found" }
                      </Marquee>
                    </Typography>
                    <span style={{
                      position: "absolute",
                      top: 0,
                      right: "-1px",
                      zIndex: 2,
                      width: "25px",
                      height: "32px",
                      backgroundImage: `linear-gradient(to right, ${hexToRgba(color, '0')}, ${hexToRgba(color, '1')} 90%)`
                    }}></span>
                  </Box>
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
                    <span style={{
                      position: "absolute",
                      top: 0,
                      left: "-1px",
                      zIndex: 2,
                      width: "20px",
                      height: "28px",
                      backgroundImage: `linear-gradient(to left, ${hexToRgba(color, '0')}, ${hexToRgba(color, '1')} 90%)`
                    }}></span>
                    <Typography variant="subtitle1" style={{ color: textColor }}>
                      <Marquee
                        delay={0}
                        direction="left"
                      >
                        { artists }
                      </Marquee>
                    </Typography>
                    <span style={{
                      position: "absolute",
                      top: 0,
                      right: "-1px",
                      zIndex: 2,
                      width: "20px",
                      height: "28px",
                      backgroundImage: `linear-gradient(to right, ${hexToRgba(color, '0')}, ${hexToRgba(color, '1')} 90%)`
                    }}></span>
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
