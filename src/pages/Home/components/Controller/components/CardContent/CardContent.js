import React, { useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, CardContent, Typography, Link } from '@material-ui/core';

import { OverflowDetector } from 'react-overflow';
import Marquee from 'react-double-marquee';

import PlayButton from './components/PlayButton';
import SkipButton from './components/SkipButton';

const useStyles = makeStyles((theme) => ({
  content: {
    flex: '1 0 auto',
  },
}));

export default function Controller(props) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { player, textColor, currentMe } = props;

  const [scrollTitle, setScrollTitle] = useState(false);
  const [scrollArtist, setScrollArtist] = useState(false);
  const [oldSong, setOldSong] = useState(false);

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

  const song = player && player.item;
  const songTitle = song && song.name || "No active device found";

  const artists = song && song.artists && song.artists.map((artist)=> artist.name).join(', ') || "Play on Spotify to ctrl" ;

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
      flexDirection="column"
      whiteSpace="noWrap"
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
                  { songTitle }
                </Marquee>
              </Typography>
            :
              <Typography variant="h6" style={{ color: textColor }}>
                { songTitle }
              </Typography>
          }
        </OverflowDetector>

        <OverflowDetector onOverflowChange={handleArtistOverflow}>
          {
            scrollArtist ?
              <Typography variant="subtitle1" style={{ color: textColor }}>
                <Marquee
                  delay={0}
                  direction="left"
                >
                  { artists }
                </Marquee>
              </Typography>
            :
              <Typography variant="subtitle1" style={{ color: textColor }}>
                { artists }
              </Typography>
          }
        </OverflowDetector>
      </CardContent>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingLeft={1}
        paddingBottom={1}
      >
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

      { currentMe &&
        <Box padding={1} color={textColor}>
          <Typography variant="caption">ctrl.{currentMe.id}</Typography>
        </Box>
      }
    </Box>
  );
}
