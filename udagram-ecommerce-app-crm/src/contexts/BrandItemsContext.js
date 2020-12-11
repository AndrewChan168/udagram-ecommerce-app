import React, { createContext, useState } from 'react';

export const BrandItemsContext = createContext();

export const BrandItemsContextProvider = props=>{
    const [brandId, setBrandId] = useState("");
    const [itemId, setItemId] = useState("");
    const [itemName, setItemName] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [price, setPrice] = useState(0);
    const [isCreate, setIsCreate] = useState(null);
    const [isImage, setIsImage] = useState(false);
    const [shouldRefresh, setShouldRefresh] = useState(false);

    return(
        <BrandItemsContext.Provider 
            value={{
                brandId, setBrandId, isImage, setIsImage,
                itemId, setItemId, itemName, setItemName,
                introduction, setIntroduction, price, setPrice,
                isCreate, setIsCreate, shouldRefresh, setShouldRefresh
            }}
        >
            {props.children}
        </BrandItemsContext.Provider>
    );
}