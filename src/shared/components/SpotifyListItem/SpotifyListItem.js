import React, { useState } from "react";

import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
} from "@material-ui/core";

import FullscreenDialog from "shared/components/FullscreenDialog";

export default function SpotifyListItem(props) {
  const [open, setOpen] = useState(false);
  const {
    children,
    avatarSrc,
    avatarAlt,
    avatarVariant,
    primaryText,
    primaryTextColor,
    secondaryText,
    secondaryTextColor,
    dialogTitle,
    dialogHeaderContent,
    dialogAvatarSrc,
  } = props;

  return (
    <Box>
      <ListItem
        button
        alignItems="center"
        onClick={() => {
          setOpen(true);
        }}
      >
        <ListItemAvatar>
          {avatarSrc ? (
            <Avatar
              variant={avatarVariant || "rounded"}
              alt={avatarAlt}
              src={avatarSrc}
            />
          ) : (
            <Avatar variant="rounded" alt={avatarAlt} />
          )}
        </ListItemAvatar>
        <ListItemText
          disableTypography={true}
          primary={
            <Typography
              variant="body1"
              color={primaryTextColor || "textPrimary"}
              noWrap
            >
              {primaryText}
            </Typography>
          }
          secondary={
            <Typography
              variant="body2"
              color={secondaryTextColor || "textSecondary"}
              display="inline"
            >
              {secondaryText}
            </Typography>
          }
        />
      </ListItem>
      <FullscreenDialog
        open={open}
        setOpen={setOpen}
        title={dialogTitle}
        headerContent={dialogHeaderContent}
        image={dialogAvatarSrc || avatarSrc}
      >
        {children}
      </FullscreenDialog>
    </Box>
  );
}
