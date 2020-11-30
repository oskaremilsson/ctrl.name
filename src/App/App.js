import React from "react";
import { useLocation } from "react-router-dom";

import NavBar from "shared/components/NavBar";

import Home from "pages/Home";
import Profile from "pages/Profile";
import Playlists from "pages/Playlists";
import Search from "pages/Search";

import FetchConsents from "./components/FetchConsents";
import RefreshTokens from "./components/RefreshTokens";
import SyncPlayer from "./components/SyncPlayer";

import { Box, Container } from "@material-ui/core";

export default function App() {
  const location = useLocation();

  let component;
  switch (location && location.pathname) {
    case "/profile":
      component = <Profile />;
      break;
    case "/playlists":
      component = <Playlists />;
      break;
    case "/search":
      component = <Search />;
      break;
    default:
      component = <Home />;
      break;
  }

  return (
    <Box marginBottom={9}>
      <Container maxWidth="md">{component}</Container>
      <Box position="fixed" bottom={0} width="100%" zIndex={2}>
        <NavBar />
      </Box>

      <FetchConsents />
      <RefreshTokens />
      <SyncPlayer />
    </Box>
  );
}
