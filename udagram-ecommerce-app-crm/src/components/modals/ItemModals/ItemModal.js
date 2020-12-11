import React, { useContext } from 'react';

import {BrandItemsContext} from './../../../contexts/BrandItemsContext';
import LoadingModal from './../LoadingModal';
import CreateItemModal from './CreateItemModal';
import ModifyItemModal from './ModifyItemModal';
import UploadImageModal from './UploadImageModal';

const ItemModal = ()=>{
    const {isImage, isCreate} = useContext(BrandItemsContext);

    if (isImage) return <UploadImageModal />

    if(isCreate===null){
        return <LoadingModal />
    }else if(isCreate){
        return <CreateItemModal />
    }else {
        return <ModifyItemModal />
    }
}

export default ItemModal;