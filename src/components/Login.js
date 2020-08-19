import React, { useEffect, useCallback } from 'react';
import TwitchButton from './TwitchButton';

function Login(props) {
   const getTokenIf = useCallback(
      e => {
         if (e.source.opener) props.getToken(e.data);
      },
      [props]
   );

   useEffect(() => {
      window.addEventListener('message', getTokenIf);
      return () => {
         window.removeEventListener('message', getTokenIf);
      };
   }, [getTokenIf]);

   return (
      <div id="side-bar-container">
         <TwitchButton auth={props.auth} />
      </div>
   );
}

export default Login;
