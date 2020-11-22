import React, { useEffect, useState } from "react";

import { Switch } from "@material-ui/core";

import api from "utils/api";

const setCookie = (gdpr_consent) => {
  let now = new Date();
  let expire = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
  document.cookie = `gdpr_consent=${gdpr_consent} ; expires=${expire}`;
};

export default function GdprConsent(props) {
  const { setLoginDisabled } = props;

  const gdpr_consent = document?.cookie
    ?.split("; ")
    ?.find((row) => row.startsWith("gdpr_consent"))
    ?.split("=")[1];

  const [consent, setConsent] = useState(gdpr_consent);
  const [giveConsent, setGiveConsent] = useState(false);

  useEffect(() => {
    setLoginDisabled(!consent);
  }, [consent, gdpr_consent, setLoginDisabled]);

  useEffect(() => {
    if (giveConsent) {
      api
        .post("createGdprConsent")
        .then((res) => {
          setCookie(res?.data?.Message);
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
