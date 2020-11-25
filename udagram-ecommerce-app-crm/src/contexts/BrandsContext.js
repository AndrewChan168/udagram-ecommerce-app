import React, { createContext, useState } from 'react';

export const BrandsContext = createContext();

export const BrandsContextProvider = props=>{
    const [brands, setBrands] = useState([]);

    return(
        <BrandsContext.Provider value={[brands, setBrands]}>
            {props.children}
        </BrandsContext.Provider>
    );
}