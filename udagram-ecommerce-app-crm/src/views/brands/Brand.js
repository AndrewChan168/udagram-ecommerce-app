import React from 'react';

import {BrandsContextProvider} from './../../contexts/BrandsContext';
import BrandRender from './BrandRender';

const Brand = ()=>(
    <BrandsContextProvider>
        <BrandRender />
    </BrandsContextProvider>
);

export default Brand;