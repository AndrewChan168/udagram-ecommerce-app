import React from 'react';

const Brand = (props)=>{
    const { brandId,brandName,description } = props;

    return(
        <div className="card" key={brandId}>
            <div className="card-body">
                <h5 className="card-title">{brandName}</h5>
                <p className="card-text">{description}</p>
            </div>
        </div>
    );
};

const BrandList = (props)=>{
    const { brandList } = props;

    if (brandList.length===0){
        return null
    }else{
        return(
            brandList.map((brand)=>(<Brand {...brand} key={brand.brandId} />))
        );
    }
};

export default BrandList;