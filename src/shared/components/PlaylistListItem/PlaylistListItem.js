import React from "react";

import SpotifyListItem from "shared/components/SpotifyListItem";
import Playlist from "shared/components/Playlist";

export default function PlaylistListItem({ playlist }) {
  const image =
    playlist?.images?.length > 0
      ? playlist.images[playlist.images.length - 1]?.url
      : undefined;

  const dialogImage = playlist?.images[0]?.url;

  return (
    <SpotifyListItem
      avatarSrc={image}
      avatarAlt={playlist?.name}
      primaryText={playlist?.name}
      secondaryText={`${playlist?.tracks?.total} tracks`}
      dialogTitle={playlist?.name}
      dialogHeaderContent={playlist?.description}
      dialogAvatarSrc={dialogImage}
    >
      <Playlist playlist={playlist} />
    </SpotifyListItem>
  );
}
