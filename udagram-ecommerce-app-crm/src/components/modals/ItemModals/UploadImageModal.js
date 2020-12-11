import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

import {BrandItemsContext} from './../../../contexts/BrandItemsContext';
const REACT_APP_API_ID = "9947yheo2d";

const UploadImageModal = props=>{
    const baseURL = `https://${REACT_APP_API_ID}.execute-api.us-east-1.amazonaws.com/dev`;
    //const { itemId } = props;
    const [files, setFiles] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    const { itemId, setIsImage, shouldRefresh, setShouldRefresh } = useContext(BrandItemsContext);

    const genHeader = async()=>{
        const accessToken = await getAccessTokenSilently();
        return {
            'Authorization':`Bearer ${accessToken}`
        }
    }

    const onClickHander = (inputFiles)=>{
        console.log(`Number of files: ${inputFiles.length}`);
        setFiles([...inputFiles]);
    }

    const uploadImage = async (file)=>{
        const headers = await genHeader();
        const imageUrl = `${baseURL}/itemImage`;
        const imageBody = {itemId}
        const imageOptions = { url:imageUrl, data:imageBody, headers, method:"POST" };
        //console.log('imageOptions: ', imageOptions)
        const response = await axios(imageOptions);
        console.log(`response result:`)
        console.log(response.data)
        //const uploadUrl = (await axios(imageOptions)).uploadUrl;
        const uploadUrl = response.data.itemImage.uploadUrl;
        //const uploadBody = { data:imageBody };
        const uploadBody = file;
        const uploadHeaders = {'Content-Type': 'image/png'}
        const uploadOptions = { url:uploadUrl, data:uploadBody, method:"PUT", headers:uploadHeaders };
        await axios(uploadOptions);
    }

    const uploadImages = async ()=>{
        await Promise.all(files.map(async (file)=>{
            await uploadImage(file);
        }));
        setIsImage(false);
        setShouldRefresh(!shouldRefresh);
    }

    return(
        <div className="modal" id="brand-modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Upload One Image</h5>
                        <button className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <form>
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
                                <div className="custom-file">
                                    <input type="file" id="uploadImage" className="custom-file-input" onChange={(event)=>onClickHander(event.target.files)} />
                                    <label className="custom-file-label" for="myfile">Choose file</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" data-dismiss="modal" onClick={uploadImages}>Submit</button>
                        <button className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadImageModal;