import React, {useState, useEffect} from 'react';
import api from '../../../../utils/api';
import MaterialIcon from 'material-icons-react';
import { Dropdown } from 'semantic-ui-react';

import './style.css';

const getConsents = (setConsents) => {
  api.post('getConsents', new FormData())
  .then(res => {
    setConsents(res.data.Consents);
  });
};

const changedMe = (e, setCurrentMe, setTokenFetched) => {
  console.log(e);
  setCurrentMe(e.target.value);
  setTokenFetched(false);
}

export default function Concents(props) {
  const { me, currentMe, setCurrentMe, setTokenFetched } = props;
  const [consents, setConsents] = useState(undefined);

  useEffect(() => {
    if (!consents) {
      getConsents(setConsents);
    }
  }, [consents]);
  
  const consentList = consents && consents.map((consent) => 
    <option key={consent} value={consent}>
      {consent}
    </option>
  );


  return (
    <div>
      <div className="now-controlling">
        <MaterialIcon key={"face"} size={50} icon="face" />
        <select
          onChange={(e) => { changedMe(e, setCurrentMe, setTokenFetched) }}
          selected={currentMe}
        >
          <option key={me.id} value={me.id}>{me.id}</option>
          {consentList}
        </select>
      </div>
    </div>
  );
}
