import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

import {BrandsContext} from './../../contexts/BrandsContext'
import BrandList from '../../components/lists/brand-list/BrandList';

const  BrandRender = ()=>{
    const baseURL = `https://${process.env.REACT_APP_API_ID}.execute-api.us-east-1.amazonaws.com/dev`;
    const [ brands,setBrands ] = useContext(BrandsContext);
    const [ isFetch, setIsFetch ] = useState(true);
    const { getAccessTokenSilently } = useAuth0();
/*
    useEffect(()=>{
        fetchBrands();
        console.log(`List of brands`)
        console.log(brands);
    }, []);
*/
    useEffect(()=>{
        /*const fetchData = async ()=>{
            await fetchBrands();
        }*/
        const fetchData = async ()=>{
            console.log(`Fetch data in BrandRender`);
            await fetchBrands();
        }
        fetchData();
    }, [isFetch]);

    const genHeader = async()=>{
        const accessToken = await getAccessTokenSilently();
        return {
            'Authorization':`Bearer ${accessToken}`
        }
    }

    const fetchBrands = async ()=>{
        console.log(`REACT_APP_AUTH0_DOMAIN: `, process.env.REACT_APP_AUTH0_DOMAIN)
        console.log(`REACT_APP_AUTH0_CLIENT_ID: `, process.env.REACT_APP_AUTH0_CLIENT_ID)
        console.log(`REACT_APP_AUTH0_AUDIENCE: `, process.env.REACT_APP_AUTH0_AUDIENCE)
        console.log('APIID: ',process.env.REACT_APP_API_ID)

        const headers = await genHeader();
        console.log(`header: `, headers)

        const axiosInstance = axios.create({
            baseURL:`${baseURL}/myBrands`, headers:headers
        });
        console.log(`baseURL `, `${baseURL}/myBrands`)
        console.log(`axiosInstance `, axiosInstance)
        const result = await axiosInstance.get();
        console.log(`fetchBrands result `, result.data.brands)
        setBrands([...result.data.brands]);
        console.log(`List of brands: `, brands)
    }

    const addBrand = async (newBrand)=>{
        const headers = genHeader();

        const axiosInstance = axios.create({
            baseURL:`${baseURL}/brand`, headers
        });

        const responseBrand = await axiosInstance.post(JSON.stringify(newBrand));
        setBrands([...brands, responseBrand]);
        setIsFetch(!isFetch);
    }

    return(
        <div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h3 className="display-6">Your Own Brands</h3>
                    <p>All your brands are here! You may create new brand by clicking below button</p>
                    <button type="button" class="btn btn-outline-primary btn-lg">Create your new brand</button>
                </div>
            </div>
            <BrandList brandList={brands}/>
        </div>
    );
};

export default BrandRender;

/*
        <div>
            {brands.map(brand=>(
                <div key={brand.brandId}>
                    <h4>{brand.brandName}</h4>
                    <p>{brand.description}</p>
                </div>
            ))}
        </div>
*/