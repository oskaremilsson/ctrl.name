import React from "react";

import SpotifyListItem from "shared/components/SpotifyListItem";
import Artist from "shared/components/Artist";

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function ArtistListItem({ artist }) {
  const image =
    artist?.images?.length > 0
      ? artist.images[artist.images.length - 1]?.url
      : undefined;
  const dialogImage = artist?.images[0]?.url;

  return (
    <SpotifyListItem
      avatarSrc={image}
      avatarAlt={artist?.name}
      avatarVariant="circle"
      primaryText={artist?.name}
      secondaryText={`${numberWithCommas(artist?.followers?.total)} followers`}
      dialogTitle={artist?.name}
      dialogAvatarSrc={dialogImage}
    >
      <Artist artist={artist} />
    </SpotifyListItem>
  );
}
