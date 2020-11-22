import React, { useEffect, useState } from "react";

import { Box, Switch, Link, Typography } from "@material-ui/core";

import api from "utils/api";

export default function GdprConsent(props) {
  const { setLoginDisabled } = props;

  const gdpr_consent = document?.cookie
    ?.split("; ")
    ?.find((row) => row.startsWith("gdpr_consent"))
    ?.split("=")[1];

  const [consent, setConsent] = useState(gdpr_consent);
  const [giveConsent, setGiveConsent] = useState(false);

  useEffect(() => {
    console.log("consents!", consent);
    setLoginDisabled(!consent);
  }, [consent, gdpr_consent, setLoginDisabled]);

  useEffect(() => {
    if (giveConsent) {
      api
        .post("createGdprConsent")
        .then((res) => {
          setConsent(res?.data?.Message);
        })
        .catch((_) => {
          console.log("error");
        });
    }
  }, [giveConsent]);

  const handleSwitchChange = (_, value) => {
    if (!value) {
      document.cookie =
        "gdpr_consent= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
      setConsent(undefined);
    }
    setGiveConsent(value);
  };

  return (
    <Box display="flex" alignItems="center">
      <Switch
        checked={Boolean(consent)}
        onChange={handleSwitchChange}
        name="gdpr-consent"
        color="secondary"
        inputProps={{ "aria-label": "give consent" }}
      />
      <Box width={200}>
        <Typography variant="caption">
          I've read and agreed with the{" "}
          <Link
            component="button"
            onClick={() => {
              console.log("read terms");
            }}
          >
            terms and conditions
          </Link>
          .
        </Typography>
      </Box>
    </Box>
  );
}
