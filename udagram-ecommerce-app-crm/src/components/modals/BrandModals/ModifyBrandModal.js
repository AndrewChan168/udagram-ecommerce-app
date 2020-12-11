import React, { useState,useContext } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

import { BrandsContext } from './../../../contexts/BrandsContext';

const REACT_APP_API_ID = "9947yheo2d";

const ModifyBrandModal = ()=>{
    //const { brandId, brandName, description } = props;
    const { brandId, brandName, description, setIsCreate, shouldRefresh, setShouldRefresh } = useContext(BrandsContext);
    const [newBrandName, setNewBrandName] = useState(brandName);
    const [newDescription, setNewDecription] = useState(description);
    const { getAccessTokenSilently } = useAuth0();
    const baseURL = `https://${REACT_APP_API_ID}.execute-api.us-east-1.amazonaws.com/dev`;

    const genHeader = async()=>{
        const accessToken = await getAccessTokenSilently();
        return {
            'Authorization':`Bearer ${accessToken}`
        }
    }

    const onSubmitClick = async()=>{
        const headers = await genHeader();
        const url = `${baseURL}/brand`;
        const newBrand = {
            brandId, brandName:newBrandName, description:newDescription
        };
        const options = {
            method:"PATCH",
            data:newBrand,
            url,headers
        }
        await axios(options);
        setIsCreate(null);
        setShouldRefresh(!shouldRefresh);
    }

    return(
        <div id="brand-modal" className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Change your brand</h5>
                        <button className="close" data-dismiss="modal" onClick={()=>setIsCreate(null)}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="id">Brand ID</label>
                                <input 
                                    className="form-control" 
                                    type="text" id="id" 
                                    value={brandId}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Brand Name</label>
                                <input 
                                    className="form-control" 
                                    type="text" id="name" 
                                    value={newBrandName}
                                    onChange={(event)=>setNewBrandName(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Brand Introduction</label>
                                <textarea 
                                    className="form-control" 
                                    id="message" rows="3" 
                                    value={newDescription}
                                    onChange={(event)=>setNewDecription(event.target.value)}
                                ></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" data-dismiss="modal" onClick={onSubmitClick}>Submit</button>
                        <button className="btn btn-secondary" data-dismiss="modal" onClick={()=>setIsCreate(null)}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default ModifyBrandModal;