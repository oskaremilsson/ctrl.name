import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectors } from "shared/stores";

import { Box, Avatar, Badge, Tooltip } from "@material-ui/core";

const { getMe, getCurrentMe, getSpotifyPlayer } = selectors;

export default function Playlists() {
  const currentMe = useSelector((state) => getCurrentMe(state));
  const me = useSelector((state) => getMe(state));
  const player = useSelector((state) => getSpotifyPlayer(state));
  const [infoOpen, setInfoOpen] = useState(false);

  const avatarAlt = currentMe?.id || "current";
  const avatarImg = currentMe?.images[0]?.url;

  const tooltipTitle =
    currentMe?.id === me?.id
      ? "Controlling myself"
      : `Controlling ${currentMe?.display_name}`;

  return (
    <Box position="fixed" bottom={72} right={24} zIndex={1}>
      <Tooltip
        onClose={() => setInfoOpen(false)}
        onOpen={() => setInfoOpen(true)}
        open={infoOpen}
        title={tooltipTitle}
        placement="left"
        arrow
      >
        <Badge
          color={player ? "secondary" : "primary"}
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant="dot"
        >
          <Avatar
            alt={avatarAlt}
            src={avatarImg}
            onClick={() => setInfoOpen(true)}
          >
            {avatarAlt}
          </Avatar>
        </Badge>
      </Tooltip>
    </Box>
  );
}
