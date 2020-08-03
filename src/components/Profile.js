import React, { useState } from 'react';
import ProfileImg from './ProfileImg';

function Profile({ streamer, request, addFav, streamerHistory }) {
   const [inputValue, setInputValue] = useState('');

   const autoComplete = sugerencia => {
      console.log(sugerencia);
      setInputValue(sugerencia);
   };

   const getStreamerList = () => {
      if (inputValue === '') {
         return;
      }
      const sugerencias = streamerHistory.filter(streamer =>
         streamer.startsWith(inputValue)
      );
      return sugerencias.map(sug => (
         <li onClick={() => autoComplete(sug)} key={sug}>
            {sug}
         </li>
      ));
   };

   return (
      <div className="side-bar-container">
         <form onSubmit={e => request(e, inputValue)}>
            <div className="input-wrapper">
               <input
                  onChange={e => setInputValue(e.target.value)}
                  value={inputValue}
                  type="text"
               />
               <ul className="sugerencia">{getStreamerList()}</ul>
            </div>
            <button type="submit">Search your Streamer</button>
         </form>
         <h1>{streamer ? streamer.login : ''} </h1>
         <p>{streamer ? streamer.description : ''}</p>
         <a
            href={`https://twitch.tv/${streamer ? streamer.login : ''}`}
            rel="noopener noreferrer"
            target="_blank"
         >
            {streamer.login ? 'ver en twitch' : 'ir a Twitch'}
         </a>
         <ProfileImg streamer={streamer} />
         {streamer.login ? (
            <button type="submit" onClick={addFav}>
               add to favorites
            </button>
         ) : null}
      </div>
   );
}

export default Profile;
