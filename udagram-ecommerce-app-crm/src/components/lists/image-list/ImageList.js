import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Loading from './../../../views/Loading';

const REACT_APP_API_ID = "9947yheo2d";

const Image = (props)=>(
    <div className="col-6">
        <div className="img-thumbail">
            <img src={props.url} />
        </div>
    </div>
);

const ImageList = props=>{
    const { itemId } = props;
    const [ isLoading, setIsLoading ] = useState(true);
    const [ imageUrls, setImageUrls ] = useState([]);
    const baseURL = `https://${REACT_APP_API_ID}.execute-api.us-east-1.amazonaws.com/dev`;

    useEffect(()=>{
        const fetchData = async()=>{
            await fetchImages();
        }

        setIsLoading(true);
        fetchData();
        setIsLoading(false);
    }, [itemId]);

    const fetchImages = async()=>{
        const url = `${baseURL}/itemImages/${itemId}`;
        const options = {
            method:'GET', url
        }
        const response = await axios(options)
        console.log('response');
        console.log(response.data)
        setImageUrls([...response.data.images.map((doc)=>(doc.thumbnailUrl))]);
        //console.log(`List of photo URL:`);
        console.log([...response.data.images.map((doc)=>(doc.thumbnailUrl))]);
    }

    return(
        <div className="row">
            {
                isLoading ? <Loading /> : imageUrls.map((imageUrl)=><Image url={imageUrl}/>) 
            }
        </div>
    )
}

export default ImageList;