import React, { useEffect } from 'react';
import TwitchButton from './TwitchButton';

function Login(props) {
   useEffect(
      () =>
         window.addEventListener('message', e => {
            if (e.source.opener) props.getToken(e.data);
         }),
      [props]
   );

   return (
      <div className="side-bar-container">
         <TwitchButton />
      </div>
   );
}

export default Login;
