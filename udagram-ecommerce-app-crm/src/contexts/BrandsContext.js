import React, { createContext, useState } from 'react';

export const BrandsContext = createContext();

export const BrandsContextProvider = props=>{
    const [isCreate, setIsCreate] = useState(null);
    const [brandId, setBrandId] = useState("");
    const [brandName, setBrandName] = useState("");
    const [description, setDescription] = useState("");
    const [shouldRefresh, setShouldRefresh] = useState(false);

    return(
        <BrandsContext.Provider 
            value={{
                isCreate, setIsCreate, 
                brandId, setBrandId, 
                brandName, setBrandName, 
                description, setDescription,
                shouldRefresh, setShouldRefresh
            }}
        >
            {props.children}
        </BrandsContext.Provider>
    );
}