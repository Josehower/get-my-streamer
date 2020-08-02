import React from 'react';

function ProfileImg({ streamer }) {
   return (
      <img
         className="avatarImage"
         src={streamer.profile_image_url}
         alt="my streamer avatar"
      />
   );
}

export default ProfileImg;
