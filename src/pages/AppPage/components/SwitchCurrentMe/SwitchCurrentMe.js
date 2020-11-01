import React, {useState, useEffect} from 'react';
import api from 'utils/api';
import { Box, MenuItem, Select, InputLabel, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SettingsRemote } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const getConsents = (setConsents) => {
  api.post('getConsents', new FormData())
  .then(res => {
    setConsents(res.data.Consents);
  });
};

export default function SwitchCurrentMe(props) {
  const classes = useStyles();
  const { me, currentMe, setCurrentMe, setTokenFetched } = props;
  const [consents, setConsents] = useState(undefined);

  const changeCurrentMe = (e) => {
    setCurrentMe(e.target.value);
    setTokenFetched(false);
  };

  useEffect(() => {
    if (!consents) {
      getConsents(setConsents);
    }
  }, [consents]);

  const consentItems = consents && consents.map((consent) => 
    <MenuItem key={consent} value={consent}>
      {consent}
    </MenuItem>
  );

  return (
    <Box>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="select-current-me-label">
          <SettingsRemote /> active
        </InputLabel>
        <Select
          labelId="select-current-me-label"
          id="select-current-me"
          value={currentMe}
          label="Controling"
          onChange={changeCurrentMe}
        >
          <MenuItem key={me.id} value={me.id}>
            {me.id}
          </MenuItem>
          {consentItems}
        </Select>
      </FormControl>
    </Box>
  );
}
