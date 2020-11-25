import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

import {BrandItemsContext} from './../../contexts/BrandItemsContext';
import BrandNameList from './../../components/lists/brand-list/BrandNameList';

const ProductRender = ()=>{
    const baseURL = `https://${process.env.REACT_APP_API_ID}.execute-api.us-east-1.amazonaws.com/dev`;
    const [brandItems, setBrandItems] = useContext(BrandItemsContext);
    const [ isFetch, setIsFetch ] = useState(true);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(()=>{
        const fetchData= async ()=>{
            console.log(`Fetch data in ProductRender`);
            await fetchItems();
        }
        fetchData();
    }, [isFetch]);

    const genHeader = async()=>{
        const accessToken = await getAccessTokenSilently();
        return {
            'Authorization':`Bearer ${accessToken}`
        }
    }

    const fetchItems = async ()=>{
        const headers = await genHeader();
        console.log(`header: `, headers)
        const axiosInstance = axios.create({
            baseURL:`${baseURL}/items/jwtSub`, headers
        });
        const result = await axiosInstance.get();
        console.log(`fetchItems result `, result.data)
        setBrandItems([...result.data]);
    }

    const addItem = async (newItem, img)=>{
        const header = genHeader();
        const axiosInstance = axios.create({
            baseURL:`${baseURL}/item`, header
        });
        const response = await axiosInstance.post(newItem);
        const uploadPhotoUrl = response.uploadPhotoUrl;
        const axios = new axios();
        await axios.put(uploadPhotoUrl,img);

        await fetchItems();
        setIsFetch(!isFetch);
    }

    return(
        <BrandNameList itemBrandList={brandItems}/>
    );
}

export default ProductRender;
//<BrandNameList itemBrandList={brandItems}/>