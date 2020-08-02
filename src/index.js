import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import Card from './components/Card';
import Login from './components/Login';
import Profile from './components/Profile';
import './css/style.scss';

function App() {
   const [streamer, setStreamer] = useState({
      profile_image_url:
         'https://www.sunjs.com/staticfile/ace_admin_v1.4.0/assets/avatars/profile-pic.jpg',
   });

   const [userToken, setToken] = useState(null);

   const favStateInit = JSON.parse(localStorage.getItem('favStreamers'));
   const [cardsList, setCardList] = useState(favStateInit ? favStateInit : []);

   const stateSet = new Set();
   const stateInit = localStorage.getItem('streamerList')
      ? JSON.parse(localStorage.getItem('streamerList'))
      : [];
   stateInit.forEach(streamer => stateSet.add(streamer));
   const [streamerList, setStreamerList] = useState([...stateSet]);

   const removeStreamer = streamerName => {
      console.log(cardsList.filter(item => item.login !== streamerName));
      setCardList(cardsList.filter(item => item.login !== streamerName));
   };

   useEffect(() => {
      console.log('Authenticating...');
      window.opener && window.opener.postMessage(window.location.hash, window.origin);
   }, []);

   const request = (e, streamerName) => {
      e.preventDefault();
      if (streamerName === '') {
         return;
      }

      fetch(`https://api.twitch.tv/helix/users?login=${streamerName}`, {
         headers: {
            'Client-ID': 'uxgybruw7wpbyvx017h0tf97h66w4u',
            Authorization: `Bearer ${userToken}`,
         },
      })
         .then(response => {
            if (!response.ok) {
               throw Error(response.statusText);
            }
            return response.json();
         })
         .then(res => {
            setStreamer(res.data[0] ? res.data[0] : streamer);
            if (res.data[0]) {
               const dataSet = new Set();
               streamerList.forEach(streamer => dataSet.add(streamer));
               dataSet.add(streamerName);
               setStreamerList([...dataSet]);
               localStorage.setItem('streamerList', JSON.stringify([...dataSet]));
               console.log(dataSet);
            }
         })
         .catch(response => console.log(response));
   };

   const getUserToken = tokenURL => {
      const tokenParams = new URLSearchParams(tokenURL);
      const userTokenID = tokenParams.get('#access_token');
      setToken(userTokenID);
   };

   const renderCards = () => {
      localStorage.setItem('favStreamers', JSON.stringify(cardsList));
      return cardsList.map(card => (
         <Card remove={removeStreamer} token={userToken} streamer={card} key={card.id} />
      ));
   };

   const addFavorite = () => {
      const isFavAlready = cardsList.filter(
         favStreamer => favStreamer.login === streamer.login
      );
      if (isFavAlready[0]) {
         return;
      }
      setCardList([...cardsList, streamer]);
   };

   if (userToken === null) {
      return <Login getToken={getUserToken} />;
   } else {
      return (
         <div id="app-wrapper">
            <Profile
               streamerHistory={streamerList}
               addFav={addFavorite}
               streamer={streamer}
               request={request}
            />
            <div id="cards-container">{renderCards()}</div>
         </div>
      );
   }
}

render(<App />, document.getElementById('myApp'));
