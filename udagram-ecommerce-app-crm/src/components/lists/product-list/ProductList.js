import React, { useContext } from 'react';

import { BrandItemsContext } from './../../../contexts/BrandItemsContext';
import Camera from './../../../assets/img/camera.svg';
import PencilSquare from './../../../assets/img/pencil-square.svg';
import ImageList from './../image-list/ImageList';

const Product = (props)=>{
    const { item, brand } = props;
    const { setIsCreate, setBrandId, setItemId, setItemName, setIntroduction, setPrice, setIsImage } = useContext(BrandItemsContext);

    const onModifyClick = ()=>{
        setBrandId(brand.brandId);
        setItemId(item.itemId);
        setItemName(item.itemName);
        setIntroduction(item.introduction);
        setPrice(item.price);
        setIsCreate(false);
    }

    const onUploadClick = ()=>{
        setItemId(item.itemId);
        setIsImage(true);
    }

    return(
        <ul className="list-group list-group-flush">
            <li className="list-group-item" key={item.itemId}>
                <h5>{item.itemName}</h5>
                <p><b>Price:</b> {`${item.price}`}</p>
                <p><b>Images:</b></p><br />
                <ImageList itemId={item.itemId} /><br />
                <button className="btn btn-primary" data-toggle="modal" data-target="#brand-modal" onClick={onUploadClick}>
                    <img src={Camera}  alt="" width="24" height="24" title="Bootstrap" />
                </button>
                <button className="btn btn-primary" data-toggle="modal" data-target="#brand-modal" onClick={onModifyClick}>
                    <img src={PencilSquare}  alt="" width="24" height="24" title="Bootstrap" />
                </button>
            </li> 
        </ul>
    );
}

const ProductList = (props)=>{
    const { items, brand } = props;

    if(items.length===0){
        return <h5>This brand has no product. You may create item for this brand by clicking create button</h5>
    }else{
        return(
            <div className="card-body">
                    {items.map(item=>(<Product item={item} brand={brand} />))}
            </div>
        );
    }
}

export default ProductList;