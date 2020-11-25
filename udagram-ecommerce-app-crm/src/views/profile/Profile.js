import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const Profile = ()=>{
    const { user } = useAuth0();
    const { nickname, name, picture, email, sub } = user;

    useEffect(()=>console.log(`Your sub: `, sub), [sub]);

    return (
        <div class="card">
            <img src={picture} />
            <div class="card-body">
                <h5 class="card-title">{nickname}</h5>
                <p>
                    {`Hi! ${name}`}<br />
                    {`your email: ${email}`}<br /> 
                </p>
            </div>
        </div>
    );
};

export default Profile;