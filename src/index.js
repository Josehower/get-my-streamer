import React, {
  Component,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { render } from 'react-dom';
import AuthSquare from './components/AuthSquare';
import ProfileImg from './components/ProfileImg';
import './css/style.scss';

function Square() {
  const [streamer, setStreamer] = useState({
    profile_image_url:
      'https://www.sunjs.com/staticfile/ace_admin_v1.4.0/assets/avatars/profile-pic.jpg',
  });

  const [userToken, setToken] = useState(null);

  const formInput = useRef();

  useEffect(() => {
    console.log(streamer);
    window.opener &&
      window.opener.postMessage(window.location.hash, window.origin);
  }, [streamer]);

  const request = e => {
    e.preventDefault();
    const streamerName = formInput.current.value;
    fetch(`https://api.twitch.tv/helix/users?login=${streamerName}`, {
      headers: {
        'Client-ID': 'uxgybruw7wpbyvx017h0tf97h66w4u',
        Authorization: `Bearer ${userToken}`,
      },
    })
      .catch(response => console.log(response))
      .then(response => response.json())
      .then(res => {
        setStreamer(...res.data);
      });
  };
  const getUserToken = tokenURL => {
    const tokenParams = new URLSearchParams(tokenURL);
    const userTokenID = tokenParams.get('#access_token');
    setToken(userTokenID);
  };

  if (userToken === null) {
    return <AuthSquare getToken={getUserToken} />;
  }
  return (
    <div className="app-container">
      <form onSubmit={request}>
        <input defaultValue="heggart" type="text" ref={formInput} />
        <button type="submit">Search your Streamer</button>
      </form>
      <ProfileImg streamerImg={streamer.profile_image_url} />
    </div>
  );
}

render(<Square />, document.getElementById('myApp'));
