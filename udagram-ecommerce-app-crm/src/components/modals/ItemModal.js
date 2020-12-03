import React, {useState} from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

/*
import fs from 'fs';
const {REACT_APP_API_ID} = JSON.parse(fs.readFileSync('configure.json'));
*/
const REACT_APP_API_ID = "1lp4ikin0m";

const ItemModal = (props)=>{
    const { brandId, onRefreshHandler } = props;
    const [itemName, setItemName] = useState("");
    const [intro, setIntro] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState(null);
    const { getAccessTokenSilently } = useAuth0();
    const baseURL = `https://${REACT_APP_API_ID}.execute-api.us-east-1.amazonaws.com/dev`;
    //const baseURL = `https://${process.env.REACT_APP_API_ID}.execute-api.us-east-1.amazonaws.com/dev`;

    const genHeader = async()=>{
        const accessToken = await getAccessTokenSilently();
        return {
            'Authorization':`Bearer ${accessToken}`
        }
    }

    //const uploadPhotoHandler = ()=>{}

    const clickSubmitHandler = async()=>{
        console.log('clickSubmitHanlder');
        const headers = await genHeader();
        console.log('headers:');
        console.log(headers);
        const url = `${baseURL}/item`
        console.log(url);
        const newItem = {
            itemName, price, brandId,
            introduction:intro,
        }
        console.log('newItem')
        console.log(newItem);
        const options = {
            method:'POST',
            headers,
            data:newItem,
            url
        }
        const responseItem = (await axios(options)).data.item;
        console.log(`responseItem:`)
        console.log(responseItem);
        const uploadUrl = responseItem.uploadPhotoUrl;
        if (image!==null) {
            console.log(`upload image`);
            try{
                const response = await axios.put(uploadUrl, image);
                console.log(`complete upload image, status code: ${response.status}`);
            }catch(err){
                console.log(`error: ${err.message}`);
            }
        }
        console.log(`complete clickSubmitHandler`)
        onRefreshHandler();
    }

    return(
        <div id="brand-modal" className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Creata a new Item</h5>
                        <button className="close" data-dismiss="modal">&times;</button>
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
                                <label htmlFor="name">Item Name</label>
                                <input 
                                    className="form-control" 
                                    type="text" 
                                    id="name" 
                                    placeholder="Enter Name" 
                                    onChange={(event)=>setItemName(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Item Introduction</label>
                                <input 
                                    className="form-control" 
                                    type="message" 
                                    id="intro" 
                                    placeholder="Enter Introduction" 
                                    onChange={(event)=>setIntro(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="number">Item Introduction</label>
                                <input 
                                    className="form-control" 
                                    type="number" 
                                    step="0.01"
                                    id="price" 
                                    placeholder="0.00" 
                                    onChange={(event)=>setPrice(parseFloat(event.target.value))}
                                />
                            </div>
                            <div className="form-group">
                                <div class="custom-file">
                                    <input 
                                        type="file" 
                                        id="myfile" 
                                        class="custom-file-input" 
                                        placeholder="upload photo"
                                        onChange={(event)=>setImage(event.target.files)}
                                    />
                                    <label 
                                        class="custom-file-label" 
                                        for="myfile"
                                        style={{fontSize:"14px", width:"100%", height:"100%"}}
                                    >
                                        Choose file
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="form-group">
                        <div className="modal-footer">
                            <button className="btn btn-primary" data-dismiss="modal" onClick={clickSubmitHandler}>Submit</button>
                            <button className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemModal;