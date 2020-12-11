import React, { useContext } from 'react';

import {BrandsContext} from './../../../contexts/BrandsContext';
import LoadingModal from './../LoadingModal';
import CreateBrandModal from './CreateBrandModal';
import ModifyBrandModal from './ModifyBrandModal';

const BrandModal = ()=>{
    const {isCreate} = useContext(BrandsContext);

    if(isCreate===null){
        return <LoadingModal />
    }else if(isCreate){
        return <CreateBrandModal />
    }else {
        return <ModifyBrandModal />
    }
}

export default BrandModal;