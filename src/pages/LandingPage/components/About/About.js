import React from "react";
import { Card, Box, Typography, Link } from "@material-ui/core";

export default function About() {
  return (
    <Card>
      <Box padding={2}>
        <Typography variant="h5" color="primary">
          What is ctrl.name?
        </Typography>
        <Typography paragraph>
          The service allow people to share control of their Spotifys now
          playing. Adding tracks to the queue, skip songs etc.
        </Typography>

        <Typography variant="h5" color="primary">
          How?
        </Typography>
        <Typography paragraph>
          On login, a key to Spotifys API is stored encrypted in a vault. This
          empowers others, with explicit consent, to loan that key and control
          Spotify.
        </Typography>

        <Typography variant="h5" color="primary">
          Is a consent temporary?
        </Typography>
        <Typography paragraph>
          No! This is the benefit over Spotify Group Sessions - there is no need
          to set it up on every use.
        </Typography>

        <Typography variant="h5" color="primary">
          Can I revoke a consent?
        </Typography>
        <Typography paragraph>
          Yes. You can, whenever you want, revoke a consent. Note that keys
          handed out might be valid for up to 1 hour. You can revoke the main
          key on{" "}
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://www.spotify.com/se/account/apps/"
          >
            Spotify Account Page
          </Link>
        </Typography>

        <Typography variant="h5" color="primary">
          Can I delete my data?
        </Typography>
        <Typography paragraph>
          Yes. In settings you can delete all data. This includes the key,
          consents, requests and everything else connected to your Spotify
          username. You are free to come back and login again whenever you want.
        </Typography>
      </Box>
    </Card>
  );
}
