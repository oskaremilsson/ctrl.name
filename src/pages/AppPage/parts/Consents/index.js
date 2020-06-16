import React, {useState, useEffect} from 'react';
import api from '../../../../utils/api';
import { Box, Button, Menu, MenuItem } from '@material-ui/core';

import './style.css';

const getConsents = (setConsents) => {
  api.post('getConsents', new FormData())
  .then(res => {
    setConsents(res.data.Consents);
  });
};

export default function Concents(props) {
  const { me, currentMe, setCurrentMe, setTokenFetched } = props;
  const [consents, setConsents] = useState(undefined);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCurrentMeClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeCurrentMeMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!consents) {
      getConsents(setConsents);
    }
  }, [consents]);
  
  const consentItems = consents && consents.map((consent) => 
    <MenuItem key={consent} onClick={() => {
      setCurrentMe(consent);
      closeCurrentMeMenu();
      setTokenFetched(false)
    }}>
      {consent}
    </MenuItem>
  );


  return (
    <Box>
      <Box className="now-controlling">
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleCurrentMeClick}>
          {currentMe}
        </Button>
        <Menu
        id="select-current-me"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeCurrentMeMenu}
      >
        <MenuItem key={me.id} onClick={() => {
          setCurrentMe(me.id);
          setTokenFetched(false);
          closeCurrentMeMenu();
        }}>
          {me.id}
        </MenuItem>
        {consentItems}
      </Menu>
      </Box>
    </Box>
  );
}
