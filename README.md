![ctrl.name](/public/share_img.jpg?raw=true "ctrl.name")
# ctrl.name - Share Spotify control
ReactJS app powered by [spotify-tokenshark](https://github.com/oskaremilsson/spotify-tokenshark)

## Features
### Global
* Add track to queue
* List tracks for a playlist
* List tracks for an album
* List top tracks, albums and singles for an artist

---

### Home
##### Controller
* Play/Pause
* Skip track
* Seek in track
* Switch user to control
* Background color based on album art
* Text/icon color based on background color

<img src="/public/screenshots/home.jpg?raw=true" width="250"> <img src="/public/screenshots/home_switch_ctrl.jpg?raw=true" width="250"> <img src="/public/screenshots/home_currentMe.jpg?raw=true" width="250">

##### My Top
_Saved in local storage in order to only fetch once per day_
* See your Top 5 artists on Spotify _([short term](https://developer.spotify.com/documentation/web-api/reference-beta/#category-personalization))_
* See your Top 20 tracks on Spotify _([short term](https://developer.spotify.com/documentation/web-api/reference-beta/#category-personalization))_
---
### Playlists
_Saved in redux state in order to only fetch once per app-launch_
* See your Spotify playlists
* See public Spotify playlists for the current ctrl.name
* See who you currently controlling
* See status of player for currently controlling (red/green dot)

<img src="/public/screenshots/playlists.jpg?raw=true" width="250"> <img src="/public/screenshots/playlist_queued.jpg?raw=true" width="250">

---
### Search
Free text search Spotify for:
* Tracks
* Albums
* Artists
* Playlists

<img src="/public/screenshots/search.jpg?raw=true" width="250">

---
### Profile
* Give consent to ctrl your spotify to a ctrl.name user
* Send request to get consent from a ctrl.name user
* See and manage list of consents
* See and manage list of requests

<img src="/public/screenshots/profile.jpg?raw=true" width="250">

##### Settings
* Logout
* Delete all my data

---
---

# Development

### Prerequisites
* node
* yarn
* [Spotify API](https://developer.spotify.com/) app
* [spotify-tokenshark](https://github.com/oskaremilsson/spotify-tokenshark) running

### First time setup
* `cp env.example .env`
* Fill in with your Spotify client id etc.
* `yarn install`

### Run locally
* `yarn start`
