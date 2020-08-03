import React, { useState } from 'react';
import ProfileImg from './ProfileImg';
import '../css/profile.scss';

function Profile({ streamer, request, addFav, streamerHistory }) {
   const [inputValue, setInputValue] = useState('');

   const autoComplete = searchHistory => {
      console.log(searchHistory);
      setInputValue(searchHistory);
   };

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
         <form onSubmit={e => request(e, inputValue)}>
            <div className="input-wrapper">
               <input
                  onChange={e => setInputValue(e.target.value)}
                  value={inputValue}
                  type="text"
               />
               <ul className="search-history">{getStreamerList()}</ul>
            </div>
            <button type="submit">Search your Streamer</button>
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
