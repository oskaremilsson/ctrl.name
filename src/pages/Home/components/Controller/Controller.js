import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectors } from "shared/stores";

import { makeStyles, useTheme, Box, Card } from "@material-ui/core";
import { ColorExtractor } from "react-color-extractor";
import invert from "invert-color";
import hexToRgba from "hex-to-rgba";

import CardContent from "./components/CardContent";
import SyncPlayerTimer from "./components/SyncPlayerTimer";

import coverart from "assets/coverart.png";

const { getSpotifyPlayer } = selectors;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  cover: {
    width: "100%",
    height: "100%",
    minHeight: "100%",
    minWidth: "100%",
  },
}));

export default function Controller() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const player = useSelector((state) => getSpotifyPlayer(state));

  const [color, setColor] = useState("#535b5c");
  const textColor = invert(color, true);

  const album = player && player.item && player.item.album;
  const albumName = album && album.name;
  const albumCover =
    album && album.images && album.images[0] && album.images[0].url;

  useEffect(() => {
    if (!player) {
      setColor("#535b5c");
    }
  }, [player]);

  return (
    <Box display="flex" width="100%" paddingTop={2}>
      {albumCover && (
        <ColorExtractor
          src={albumCover}
          maxColors={2}
          getColors={(colors) => {
            colors && setColor(colors[0]);
          }}
        />
      )}
      <Card
        className={classes.root}
        style={{
          background: `radial-gradient(circle at center, ${hexToRgba(
            color,
            "1"
          )} 0%, ${hexToRgba(color, "0.85")} 45%, ${hexToRgba(
            color,
            "0.6"
          )} 100%)`,
        }}
      >
        <img width="100%" src={albumCover || coverart} alt={albumName} />

        <CardContent textColor={textColor} player={player} />
      </Card>

      <SyncPlayerTimer />
    </Box>
  );
}
