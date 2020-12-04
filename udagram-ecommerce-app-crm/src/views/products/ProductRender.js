import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

import Loading from './../Loading';
import {BrandItemsContext} from './../../contexts/BrandItemsContext';
import { AdminContext } from './../../contexts/AdminContext';
import BrandNameList from './../../components/lists/brand-list/BrandNameList';

/*
import fs from 'fs';
const {REACT_APP_API_ID} = JSON.parse(fs.readFileSync('configure.json'));
*/
const REACT_APP_API_ID = "1lp4ikin0m";

const ProductRender = ()=>{
    //const baseURL = `https://${process.env.REACT_APP_API_ID}.execute-api.us-east-1.amazonaws.com/dev`;
    const baseURL = `https://${REACT_APP_API_ID}.execute-api.us-east-1.amazonaws.com/dev`;
    const [brandItems, setBrandItems] = useContext(BrandItemsContext);
    const adminId = useContext(AdminContext)[0];
    const [ isFetch, setIsFetch ] = useState(true);
    const [ isLoading, setLoading ] = useState(true);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(()=>{
        const fetchData= async ()=>{
            console.log(`Fetch data in ProductRender`);
            await fetchItems();
        }
        fetchData();
        //setLoading(false);
    }, [isFetch]);

    const genHeader = async()=>{
        const accessToken = await getAccessTokenSilently();
        return {
            'Authorization':`Bearer ${accessToken}`
        }
    }

    const fetchItems = async ()=>{
        setLoading(true);
        const headers = await genHeader();
        console.log(`header: `, headers)
        const axiosInstance = axios.create({
            baseURL:`${baseURL}/items/jwtSub`, headers
        });
        const result = await axiosInstance.get();
        console.log(`fetchItems result `, result.data)
        setBrandItems([...result.data]);
        setLoading(false);
    }

    const onRefreshHandler = ()=>{
        setIsFetch(!isFetch);
    }

    return(
        (adminId==="") ? <h5>You are not yet register as an admin. Please go to Profile page to register as an admin.</h5> 
        : (isLoading ? <Loading /> : <BrandNameList itemBrandList={brandItems} onRefreshHandler={onRefreshHandler} />)
    );
}

export default ProductRender;
//<BrandNameList itemBrandList={brandItems}/>