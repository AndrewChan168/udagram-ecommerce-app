import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

import CreateAdminButton from './../../components/buttons/CreateAdminButton';

const REACT_APP_API_ID = "1lp4ikin0m";

const Profile = ()=>{
    const baseURL = `https://${REACT_APP_API_ID}.execute-api.us-east-1.amazonaws.com/dev`;
    const { user,getAccessTokenSilently } = useAuth0();
    const { nickname, name, picture, email, sub } = user;
    const [buttonShowed, setButtonShowed] = useState(false);

    //useEffect(()=>console.log(`Your sub: `, sub), [sub]);
    useEffect(()=>{
        checkAdmin();
    }, [user]);

    const genHeader = async()=>{
        const accessToken = await getAccessTokenSilently();
        return {
            'Authorization':`Bearer ${accessToken}`
        }
    };

    const checkAdmin = async()=>{
        const headers = await genHeader();
        const axiosInstance = axios.create({
            baseURL:`${baseURL}/admin`, headers
        });
        const result = await axiosInstance.get();
        console.log(`fetchItems admin `, result.data);
        //JSON.stringify(obj) === JSON.stringify({})
        if (JSON.stringify(result.data) !== JSON.stringify({})){
            console.log(`setButtonShowed(false)`);
            setButtonShowed(false);
        }else{
            console.log(`setButtonShowed(true)`);
            setButtonShowed(true);
        }
    }

    const createAdmin = async()=>{
        const headers = await genHeader();
        const url = `${baseURL}/admin`;
        const data = {
            jwtSub:sub,
            adminName:nickname,
            adminEmail:email
        }
        const options = {
            method:"POST",
            headers, data, url
        }
        const response = await axios(options)
        console.log(`created admin`);
        console.log(response.data);
        setButtonShowed(false);
    }

    const onClick = async()=>{
        await createAdmin();
    }

    return (
        <div className="card">
            <img src={picture} />
            <div className="card-body">
                <h5 className="card-title">{nickname}</h5>
                <p>
                    {`Hi! ${name}`}<br />
                    {`your email: ${email}`}<br /> 
                    {`your sub: ${sub}`}<br />
                </p>
            </div>
            {buttonShowed ? <div className="card-footer"><CreateAdminButton onClickHandler={onClick}/></div> : null}
        </div>
    );
};

export default Profile;