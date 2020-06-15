import React from 'react';
import spotify from '../../../../utils/spotify';
import MaterialIcon from 'material-icons-react';

const spotifyAction = (access_token, action, setSyncer) => {
  spotify(access_token).post(`me/player/${action}`)
  .then(_ => {
    setSyncer(true);
  }).catch( _ => {
    setSyncer(true);
  });
};

export default function SkipButton(props) {
  const { icon, action, access_token, player, setSyncer } = props;

  return (
    <button disabled={!player} onClick={() => spotifyAction(access_token, action, setSyncer)}>
      <MaterialIcon size={40} icon={icon} />
    </button>
  );
}
