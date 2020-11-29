import React, { useState } from "react";

import { Tooltip } from "@material-ui/core";

export default function QueueUnavailableTooltip({
  player,
  track,
  position,
  children,
}) {
  const [openQueueUnavailable, setOpenQueueUnavailable] = useState(false);

  let title;
  if (!player) {
    title = "Can't queue - no track is playing";
  } else if (track.is_local) {
    title = "Can't queue - track is local";
  }

  return (
    <Tooltip
      title={title || ""}
      open={(!player || track.is_local) && openQueueUnavailable}
      onClose={() => setOpenQueueUnavailable(false)}
      arrow
      placement={position || "left"}
    >
      <span onClick={() => setOpenQueueUnavailable(true)}>{children}</span>
    </Tooltip>
  );
}
