import React, { useEffect } from 'react'

function Login (props) {

    window.opener && window.close();

    const getUserToken  = () => {
        const url = `https://id.twitch.tv/oauth2/authorize?client_id=uxgybruw7wpbyvx017h0tf97h66w4u&redirect_uri=http://localhost:3000/&scope=user:read:email&response_type=token`;
        const name = 'TwitchAuth';
        const specs = 'width=500,height=500';
        window.open(url, name, specs);
    }

    return ( 
     <button onClick={getUserToken}>Log in to Twitch</button>
    )

}

export default Login