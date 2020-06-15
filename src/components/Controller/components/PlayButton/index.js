import React from 'react';
import spotify from '../../../../utils/spotify';
import MaterialIcon from 'material-icons-react';

const spotifyAction = (access_token, action, setSyncer) => {
  spotify(access_token).put(`me/player/${action}`)
  .then(_ => {
    setSyncer(true);
  }).catch( _ => {
    setSyncer(true);
  });
};

export default function PlayButton(props) {
  const { access_token, player, setSyncer } = props;

  return (
    <div>
      { player && player.is_playing ?
        <button disabled={!player} onClick={() => spotifyAction(access_token, 'pause', setSyncer)} >
          <MaterialIcon key={"pause"} size={50} icon="pause_circle_outline" />
        </button>
        :
        <button disabled={!player} onClick={() => spotifyAction(access_token, 'play', setSyncer)}>
          <MaterialIcon key={"play"} size={50} icon="play_circle_outline" />
        </button>
      }
    </div>
  );
}
