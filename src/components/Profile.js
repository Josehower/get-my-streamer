import React, { useState, useEffect } from 'react';
import { db } from '../fBase';
import ProfileImg from './ProfileImg';
import '../css/profile.scss';

function Profile({
   streamer,
   request,
   addFav,
   streamerHistory,
   userId,
   favList,
   logOut,
}) {
   const [inputValue, setInputValue] = useState('');

   const autoComplete = searchHistory => {
      console.log(searchHistory);
      setInputValue(searchHistory);
   };

   useEffect(() => {
      request();
   }, [request]);

   useEffect(() => {
      if (userId && Number(favList) !== 0) {
         const dbRef = db.ref(`${userId}`);
         dbRef.set({ favList });
         let msge;
         dbRef.on('value', snapshot => (msge = snapshot.val()));
         console.log(msge);
      }
   }, [favList, userId]);

   const getStreamerList = () => {
      if (inputValue === '') {
         return;
      }
      const searchHistory = streamerHistory.filter(streamer =>
         streamer.startsWith(inputValue)
      );
      return searchHistory.map(sug => (
         <li onClick={() => autoComplete(sug)} key={sug}>
            {sug}
         </li>
      ));
   };

   return (
      <div id="side-bar-container">
         <div class="logout-bar">
            <button onClick={logOut} className="log-out">
               logout
            </button>
            <span className="userId">{userId}</span>
         </div>
         <form onSubmit={e => request(e, inputValue, true)}>
            <div className="input-wrapper">
               <input
                  onChange={e => setInputValue(e.target.value)}
                  value={inputValue}
                  type="text"
               />
               <ul className="search-history">{getStreamerList()}</ul>
            </div>
            <button type="submit">Search</button>
         </form>
         <div id="profile-wrapper">
            <h1>{streamer ? streamer.login : ''} </h1>
            <ProfileImg streamer={streamer} />
            <a
               href={`https://twitch.tv/${streamer ? streamer.login : ''}`}
               rel="noopener noreferrer"
               target="_blank"
            >
               {streamer.login ? 'ver en twitch' : 'ir a Twitch'}
            </a>
            <p className="profile-description">{streamer ? streamer.description : ''}</p>
            {streamer.login ? (
               <button className="add-fav" type="submit" onClick={addFav}>
                  add to favorites
               </button>
            ) : null}
         </div>
      </div>
   );
}

export default Profile;
