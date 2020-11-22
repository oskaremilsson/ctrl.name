import React, { useEffect, useState } from "react";

import { Switch } from "@material-ui/core";

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
    <Switch
      checked={Boolean(consent)}
      onChange={handleSwitchChange}
      name="gdpr-consent"
      color="secondary"
      inputProps={{ "aria-label": "give consent" }}
    />
  );
}
