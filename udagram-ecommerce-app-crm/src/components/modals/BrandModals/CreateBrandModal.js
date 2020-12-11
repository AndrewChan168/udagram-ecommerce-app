import React, { useContext, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

import {BrandsContext} from './../../../contexts/BrandsContext';

const REACT_APP_API_ID = "9947yheo2d";

const CreateBrandModal = (props)=>{
    const [ brandName, setBrandName ] = useState("");
    const [ description, setDescription ] = useState("");
    const { setIsCreate, shouldRefresh, setShouldRefresh } = useContext(BrandsContext);
    const baseURL = `https://${REACT_APP_API_ID}.execute-api.us-east-1.amazonaws.com/dev`;
    const { getAccessTokenSilently } = useAuth0();

    const onCreateButtonClickHandler = async()=>{
        if ((brandName!=="")&&(description!=="")){
            const brandJson = JSON.stringify({
                brandName,
                description
            });
            await addBrand(brandJson);
        }
        setIsCreate(null);
        setShouldRefresh(!shouldRefresh);
    };

    const genHeader = async()=>{
        const accessToken = await getAccessTokenSilently();
        return {
            'Authorization':`Bearer ${accessToken}`
        }
    }

    const addBrand = async ()=>{
        const headers = await genHeader();
        console.log('headers: ');
        console.log(headers['Authorization'])
        const url = `${baseURL}/brand`
        const newBrand = {
            brandName, description
        }
        const options = {
            method:'POST',
            headers,
            data:newBrand,
            url
        }
        await axios(options);
        setShouldRefresh(!shouldRefresh);
    }

    return(
        <div id="brand-modal" className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Creata a new brand</h5>
                        <button className="close" data-dismiss="modal" onClick={()=>setIsCreate(null)}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Brand Name</label>
                                <input 
                                    className="form-control" 
                                    type="text" id="name" 
                                    placeholder="Enter Name" 
                                    onChange={(event)=>setBrandName(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Brand Introduction</label>
                                <textarea 
                                    className="form-control" 
                                    id="message" rows="3" 
                                    placeholder="Write some words on your new Brand"
                                    onChange={(event)=>setDescription(event.target.value)}
                                ></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" data-dismiss="modal" onClick={onCreateButtonClickHandler}>Submit</button>
                        <button className="btn btn-secondary" data-dismiss="modal" onClick={()=>setIsCreate(null)}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateBrandModal;