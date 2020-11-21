import React from "react";

import SpotifyListItem from "shared/components/SpotifyListItem";
import Album from "shared/components/Album";

export default function AlbumListItem({ album, subTitle, subTitleColor }) {
  const image =
    album?.images?.length > 0
      ? album.images[album.images.length - 1]?.url
      : undefined;
  const dialogImage = album?.images[0]?.url;

  return (
    <SpotifyListItem
      avatarSrc={image}
      avatarAlt={album?.name}
      primaryText={album?.name}
      secondaryText={
        subTitle || album?.artists.map((artist) => artist.name).join(", ")
      }
      secondaryColor={subTitleColor || "textPrimary"}
      dialogTitle={album?.name}
      dialogAvatarSrc={dialogImage}
    >
      <Album album={album} />
    </SpotifyListItem>
  );
}
