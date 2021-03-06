import React, { useState } from 'react';
import ProfileImg from './ProfileImg';
import '../css/card.scss';

function Card({ streamer, token, remove }) {
   const [isOnline, setIsOnline] = useState(false);

   const fetchStreams = () => {
      return fetch(`https://api.twitch.tv/helix/streams?user_login=${streamer.login}`, {
         headers: {
            'Client-ID': 'uxgybruw7wpbyvx017h0tf97h66w4u',
            Authorization: `Bearer ${token}`,
         },
      });
   };

   const onlineChecker = async () => {
      const streamInfo = await fetchStreams().then(res => res.json());
      setIsOnline(streamInfo.data[0] ? true : false);
   };

   onlineChecker();

   return (
      <div className="streamer-card">
         <ProfileImg streamer={streamer} />
         <h1>{streamer.login}</h1>
         <div className={isOnline ? 'mark online' : 'mark offline'}>
            {isOnline ? 'Live' : 'Offline'}
         </div>
         <p>{streamer.description}</p>
         <a
            href={`https://twitch.tv/${streamer.login}`}
            rel="noopener noreferrer"
            target="_blank"
         >
            ver en Twitch
         </a>
         <button onClick={() => remove(streamer.login)}>remove</button>
      </div>
   );
}

export default Card;
