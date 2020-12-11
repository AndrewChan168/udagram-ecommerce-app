import React, { useState, useContext } from 'react';

import { BrandItemsContext } from './../../../contexts/BrandItemsContext';
import ProductList from './../product-list/ProductList';
import ItemModal from './../../modals/ItemModals/ItemModal';
import ArrowDownSquare from './../../../assets/img/arrow-down-square.svg';
import ArrowUpSquare from './../../../assets/img/arrow-up-square.svg';

const BrandName = (props)=>{
    const { brand, items } = props;
    const [isShow, setIsShow] = useState(false);
    const { isCreate, setIsCreate,setBrandId } = useContext(BrandItemsContext);

    const onCreateButtonClick = ()=>{
        setBrandId(brand.brandId);
        setIsCreate(!isCreate);
    }

    return(
        <div className="card" key={brand.brandId}>
            <div className="card-header" id={brand.brandId}>
                <h2 className="mb-0">
                    <h4>{brand.brandName}&nbsp;&nbsp;</h4>
                    <button 
                        className="btn btn-link btn-block text-left" 
                        type="button" data-toggle="collapse" 
                        data-target={`#collaspse-${brand.brandId}`} 
                        aria-expanded="true" 
                        aria-controls="collapseOne"
                        onClick={()=>setIsShow(!isShow)}
                    >
                        <img src={isShow ? ArrowUpSquare : ArrowDownSquare} alt="" width="24" height="24" title="Bootstrap"></img>
                        {isShow ? <p>Shrink</p> : <p>Show Items</p>}
                    </button>
                    <button className="btn btn-outline-secondary" data-toggle="modal" data-target="#brand-modal" onClick={onCreateButtonClick}>
                        Create a new item
                    </button>
                    <ItemModal />
                </h2>
            </div>
            <div id={`collaspse-${brand.brandId}`} className="collapse" aria-labelledby={brand.brandId} data-parent="#accordionBrandItems">
                <ProductList items={items} brand={brand} />
            </div>
        </div>
    );
}

const BrandNameList = (props)=>{
    const { itemBrandList } = props;

    /*
    useEffect(()=>{
        console.log(`itemBrandList`);
        console.log(itemBrandList);
    }, [itemBrandList])
    */
    if (itemBrandList.length===0){
        return <h4>You have no brand. Please go to Brand page to create your own brand.</h4>
    } else {
        return(
            <div className="accordion" id="accordionBrandItems">
                { itemBrandList.map(itemBrand=>{
                    return(
                        <BrandName 
                            brand={itemBrand.brand} 
                            items={itemBrand.items} 
                            key={itemBrand.brand.brandId}
                        />
                    )})}
            </div>
        );
    }
}

export default BrandNameList;
//<BrandName brand={itemBrand.brand} items={itemBrand.items} key={itemBrand.brand.brandId} />