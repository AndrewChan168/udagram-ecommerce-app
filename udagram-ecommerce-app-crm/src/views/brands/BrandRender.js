import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

import Loading from './../Loading';
import BrandModal from './../../components/modals/BrandModals/BrandModal';
import { AdminContext } from './../../contexts/AdminContext';
import { BrandsContext } from './../../contexts/BrandsContext';
import BrandList from '../../components/lists/brand-list/BrandList';

const REACT_APP_API_ID = "9947yheo2d";

const  BrandRender = ()=>{
    const baseURL = `https://${REACT_APP_API_ID}.execute-api.us-east-1.amazonaws.com/dev`;
    const [ brands,setBrands ] = useState([]);
    const adminId = useContext(AdminContext)[0];
    const { shouldRefresh, setIsCreate } = useContext(BrandsContext);
    const [ isLoading, setLoading ] = useState(true);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(()=>{
        const fetchData = async ()=>{
            console.log(`Fetch data in BrandRender`);
            await fetchBrands();
        }
        fetchData();
    }, [shouldRefresh]);

    const genHeader = async()=>{
        const accessToken = await getAccessTokenSilently();
        return {
            'Authorization':`Bearer ${accessToken}`
        }
    }

    const fetchBrands = async ()=>{
        setLoading(true);
        const headers = await genHeader();

        const axiosInstance = axios.create({
            baseURL:`${baseURL}/myBrands`, headers:headers
        });
        const result = await axiosInstance.get();
        setBrands([...result.data.brands]);
        setLoading(false);
        console.log(`List of brands: `, brands)
    }

    return(
        (adminId==="") ? <h5>You are not yet register as an admin. Please go to Profile page to register as an admin.</h5>
        : (<div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h3 className="display-6">Your Own Brands</h3>
                    <p>All your brands are here! You may create new brand by clicking below button</p>
                    <button 
                        type="button" className="btn btn-outline-primary 
                        btn-lg" data-toggle="modal" 
                        data-target="#brand-modal"
                        onClick={()=>setIsCreate(true)}
                    >
                        Create your new brand
                    </button>
                    <BrandModal />
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