import React, { useState, useEffect } from 'react';
import Login from './Login';

function AuthSquare(props) {
  useEffect(
    () =>
      window.addEventListener('message', e => {
        if (e.source.opener) props.getToken(e.data);
      }),
    [props]
  );

  return (
    <div className="app-container">
      <Login />
    </div>
  );
}

export default AuthSquare;
