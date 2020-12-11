import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

import { BrandItemsContext } from './../../../contexts/BrandItemsContext';

const REACT_APP_API_ID = "9947yheo2d";

const ModifyItemModal = props=>{
    const baseURL = `https://${REACT_APP_API_ID}.execute-api.us-east-1.amazonaws.com/dev`;
    //const { itemName, introduction, price, itemId, brandId } = props;
    const { itemName, introduction, price, itemId, brandId, setIsCreate, setShouldRefresh, shouldRefresh } = useContext(BrandItemsContext);
    const [ newItemName, setNewItemName ] = useState(itemName);
    const [ newIntroduction, setIntroduction ] = useState(introduction);
    const [ newPrice, setNewPrice ] = useState(price);
    const { getAccessTokenSilently } = useAuth0();

    const genHeader = async()=>{
        const accessToken = await getAccessTokenSilently();
        return {
            'Authorization':`Bearer ${accessToken}`
        }
    }

    const onSubmitClick = async()=>{
        const headers = await genHeader();
        const url = `${baseURL}/item/${itemId}`;
        const newItem = { itemName:newItemName, introduction:newIntroduction, price:newPrice };
        const options = {
            method:'PATCH',
            data: newItem,
            url, headers
        };
        //const responseItem = (await axis(options)).data;
        await axios(options);
        setIsCreate(null);
        setShouldRefresh(!shouldRefresh);
    }

    return(
        <div id="brand-modal" className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">modify your new Item</h5>
                        <button className="close" data-dismiss="modal" onClick={()=>setIsCreate(null)}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Brand ID</label>
                                <input 
                                    className="form-control" 
                                    readOnly 
                                    type="text" 
                                    id="brandId" 
                                    placeholder={brandId}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Item ID</label>
                                <input 
                                    className="form-control" 
                                    readOnly 
                                    type="text" 
                                    id="itemId" 
                                    placeholder={itemId}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Item Name</label>
                                <input 
                                    className="form-control" 
                                    type="text" 
                                    id="name" 
                                    value={newItemName}
                                    onChange={(event)=>setNewItemName(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Item Introduction</label>
                                <input 
                                    className="form-control" 
                                    type="message" 
                                    id="intro" 
                                    value={newIntroduction} 
                                    onChange={(event)=>setIntroduction(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="number">Item Price</label>
                                <input 
                                    className="form-control" 
                                    type="number" 
                                    step="0.01"
                                    id="price" 
                                    value={newPrice}
                                    onChange={(event)=>setNewPrice(parseFloat(event.target.value))}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="form-group">
                        <div className="modal-footer">
                            <button className="btn btn-primary" data-dismiss="modal" onClick={onSubmitClick}>Submit</button>
                            <button className="btn btn-secondary" data-dismiss="modal" onClick={()=>setIsCreate(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModifyItemModal;