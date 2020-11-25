import React, { createContext, useState } from 'react';

export const BrandItemsContext = createContext();

export const BrandItemsContextProvider = props=>{
    const [brandItems, setBrandItems] = useState([]);

    return(
        <BrandItemsContext.Provider value={[brandItems, setBrandItems]}>
            {props.children}
        </BrandItemsContext.Provider>
    );
}