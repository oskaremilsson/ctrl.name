import React, { useState, useEffect } from 'react';
import queryString from 'query-string';

import api from '../utils/api';

export default function App(props) {
  const { location } = props;

  const query = queryString.parse(location.search);
  const code = query && query.code;

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (code && !loaded) {
      var data = new FormData();
      data.append("code", code);

      api.post('codeExchange', data).then(res => {
        setLoaded(true);

        localStorage.setItem('my_tokens', JSON.stringify({
          refresh_token: res.data.Refresh_token,
          access_token: res.data.Access_token
        }));

        props.history.replace('/');
      });
    }
  }, [code, loaded, props.history]);

  return (
    <div>
    </div>
  );
}
