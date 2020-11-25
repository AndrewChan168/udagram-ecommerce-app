import React, { useEffect,useState } from 'react';
import ProductList from './../product-list/ProductList';

const BrandName = (props)=>{
    const { brand, items } = props;
    const [isShow, setIsShow] = useState(false);

    const onClickHandler = ()=>{
        setIsShow(!isShow);
    }

    return(
        <div className="card" key={brand.brandId}>
            <div className="card-header" id={brand.brandId}>
                <h2 className="mb-0">
                    <button 
                        className="btn btn-link btn-block text-left" 
                        type="button" data-toggle="collapse" 
                        data-target="#collapseOne" 
                        aria-expanded="true" 
                        aria-controls="collapseOne"
                        onClick={onClickHandler}
                    >
                        <p>{brand.brandName}</p>
                    </button>
                </h2>
            </div>
            <div id="collapseOne" className={`collapse ${isShow ? "show" : ""}`} aria-labelledby={brand.brandId} data-parent="#accordionBrandItems">
                <ProductList items={items}/>
            </div>
        </div>
    );
}

const BrandNameList = (props)=>{
    const { itemBrandList } = props;

    useEffect(()=>{
        console.log(`itemBrandList`);
        console.log(itemBrandList);
    }, [itemBrandList])
    
    
    if (itemBrandList.length===0){
        return null
    } else {
        return(
            <div className="accordion" id="accordionBrandItems">
                { itemBrandList.map(itemBrand=>{
                    return(
                        <BrandName brand={itemBrand.brand} items={itemBrand.items} key={itemBrand.brand.brandId} />
                    )})}
            </div>
        );
    }
}

export default BrandNameList;
//<BrandName brand={itemBrand.brand} items={itemBrand.items} key={itemBrand.brand.brandId} />