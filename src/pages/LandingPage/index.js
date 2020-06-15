import React from 'react';
import './style.css';
import config from '../../config/config.json';

export default function LandingPage() {

  return (
    <div className="LandingPage">
      <div>LandingPage here.</div>
      <a href={ `https://accounts.spotify.com/authorize?client_id=${config.CLIENT_ID}&response_type=code&redirect_uri=${config.SPOTIFY_REDIRECT_URI}&scope=${config.SPOTIFY_SCOPE}` }>
        Login
      </a>
    </div>
  );
}