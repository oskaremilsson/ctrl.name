import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectors } from "shared/stores";

import {
  makeStyles,
  useTheme,
  Box,
  CardContent,
  Typography,
  Chip,
  Avatar,
} from "@material-ui/core";

import { OverflowDetector } from "react-overflow";
import Marquee from "react-double-marquee";

import PlayButton from "./components/PlayButton";
import SkipButton from "./components/SkipButton";
import Seeker from "./components/Seeker";
import SwitchCurrentMe from "shared/components/SwitchCurrentMe";

import { SwapHoriz as SwapHorizIcon } from "@material-ui/icons";

const { getCurrentMe } = selectors;

const useStyles = makeStyles((theme) => ({
  content: {
    flex: "1 0 auto",
  },
}));

export default function Controller({ player, textColor }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  const currentMe = useSelector((state) => getCurrentMe(state));
  const [openSwitch, setOpenSwitch] = useState(false);

  const [scrollTitle, setScrollTitle] = useState(false);
  const [scrollArtist, setScrollArtist] = useState(false);
  const [oldSong, setOldSong] = useState(false);

  const handleTitleOverflow = (isOverflowed) => {
    if (isOverflowed) {
      setScrollTitle(true);
    }
  };

  const handleArtistOverflow = (isOverflowed) => {
    if (isOverflowed) {
      setScrollArtist(true);
    }
  };

  const song = player?.item;
  const songTitle = song?.name || "No track is playing";

  const artists =
    song?.artists?.map((artist) => artist.name).join(", ") ||
    "Play on Spotify to ctrl";

  const switchAvatarAlt = (currentMe && currentMe.id) || "ctrl.current";
  const switchAvatarImg =
    currentMe &&
    currentMe.images &&
    currentMe.images[0] &&
    currentMe.images[0].url;
  const ctrlName = currentMe && `ctrl.${currentMe.id}`;

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
      style={{ overflowX: "hidden" }}
    >
      <CardContent className={classes.content}>
        <OverflowDetector onOverflowChange={handleTitleOverflow}>
          {scrollTitle ? (
            <Typography variant="h6" style={{ color: textColor }}>
              <Marquee delay={0} direction="left">
                {songTitle}
              </Marquee>
            </Typography>
          ) : (
            <Typography variant="h6" style={{ color: textColor }}>
              {songTitle}
            </Typography>
          )}
        </OverflowDetector>

        <OverflowDetector onOverflowChange={handleArtistOverflow}>
          {scrollArtist ? (
            <Typography variant="subtitle1" style={{ color: textColor }}>
              <Marquee delay={0} direction="left">
                {artists}
              </Marquee>
            </Typography>
          ) : (
            <Typography variant="subtitle1" style={{ color: textColor }}>
              {artists}
            </Typography>
          )}
        </OverflowDetector>
      </CardContent>

      <Seeker color={textColor} />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingLeft={1}
        paddingBottom={1}
      >
        <SkipButton action={"previous"} color={textColor} />
        <PlayButton color={textColor} />
        <SkipButton action={"next"} color={textColor} />
      </Box>

      {currentMe && (
        <Box display="flex" justifyContent="flex-end" padding={1}>
          <Chip
            avatar={
              <Avatar alt={switchAvatarAlt} src={switchAvatarImg}>
                {switchAvatarAlt}
              </Avatar>
            }
            label={ctrlName}
            size="small"
            clickable
            color="primary"
            onClick={() => {
              setOpenSwitch(true);
            }}
            onDelete={() => {
              setOpenSwitch(true);
            }}
            deleteIcon={<SwapHorizIcon />}
          />
        </Box>
      )}

      <SwitchCurrentMe open={openSwitch} setOpen={setOpenSwitch} />
    </Box>
  );
}
