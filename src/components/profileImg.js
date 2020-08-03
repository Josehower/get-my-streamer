import React from 'react';

function ProfileImg({ streamerImg }) {
  return (
    <img className="avatarImage" src={streamerImg} alt="my streamer avatar" />
  );
}

export default ProfileImg;
