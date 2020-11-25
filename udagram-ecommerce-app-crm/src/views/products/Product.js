import React from 'react';

import {BrandItemsContextProvider} from './../../contexts/BrandItemsContext';
import ProductRender from './ProductRender';

const Product = ()=>(
    <BrandItemsContextProvider>
        <ProductRender />
    </BrandItemsContextProvider>
);

export default Product;
//<BrandItemsContextProvider>
//<ProductRender />
//</BrandItemsContextProvider>