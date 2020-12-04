import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

import Loading from './../Loading';
import BrandModal from './../../components/modals/BrandModal'
import { AdminContext } from './../../contexts/AdminContext';
import {BrandsContext} from './../../contexts/BrandsContext'
import BrandList from '../../components/lists/brand-list/BrandList';

/*
import fs from 'fs';
const {REACT_APP_API_ID} = JSON.parse(fs.readFileSync('configure.json'));
*/
const REACT_APP_API_ID = "1lp4ikin0m";

const  BrandRender = ()=>{
    //const baseURL = `https://${process.env.REACT_APP_API_ID}.execute-api.us-east-1.amazonaws.com/dev`;
    const baseURL = `https://${REACT_APP_API_ID}.execute-api.us-east-1.amazonaws.com/dev`;
    const [ brands,setBrands ] = useContext(BrandsContext);
    const adminId = useContext(AdminContext)[0];
    const [ isFetch, setIsFetch ] = useState(true);
    const [ isLoading, setLoading ] = useState(true);
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
        //setLoading(false);
    }, [isFetch]);

    const genHeader = async()=>{
        const accessToken = await getAccessTokenSilently();
        return {
            'Authorization':`Bearer ${accessToken}`
        }
    }

    const fetchBrands = async ()=>{
        //console.log(`REACT_APP_AUTH0_DOMAIN: `, process.env.REACT_APP_AUTH0_DOMAIN)
        //console.log(`REACT_APP_AUTH0_CLIENT_ID: `, process.env.REACT_APP_AUTH0_CLIENT_ID)
        //console.log(`REACT_APP_AUTH0_AUDIENCE: `, process.env.REACT_APP_AUTH0_AUDIENCE)
        //console.log('APIID: ',process.env.REACT_APP_API_ID)
        setLoading(true);
        const headers = await genHeader();
        //console.log(`header: `, headers)

        const axiosInstance = axios.create({
            baseURL:`${baseURL}/myBrands`, headers:headers
        });
        //console.log(`baseURL `, `${baseURL}/myBrands`)
        const result = await axiosInstance.get();
        //console.log(`fetchBrands result `, result.data.brands)
        setBrands([...result.data.brands]);
        setLoading(false);
        console.log(`List of brands: `, brands)
    }

    const addBrand = async (newBrand)=>{
        const headers = await genHeader();
        console.log('headers: ');
        console.log(headers['Authorization'])
        const url = `${baseURL}/brand`
        const options = {
            method:'POST',
            headers,
            //data:JSON.stringify(newBrand),
            data:newBrand,
            url
        }
        const responseBrand = await axios(options);
        setIsFetch(!isFetch);
    }

    return(
        (adminId==="") ? <h5>You are not yet register as an admin. Please go to Profile page to register as an admin.</h5>
        : (<div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h3 className="display-6">Your Own Brands</h3>
                    <p>All your brands are here! You may create new brand by clicking below button</p>
                    <button type="button" className="btn btn-outline-primary btn-lg" data-toggle="modal" data-target="#brand-modal">
                        Create your new brand
                    </button>
                    <BrandModal addBrandHandler={addBrand} />
                </div>
            </div>
            {isLoading ? <Loading /> : <BrandList brandList={brands}/>}
        </div>)
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