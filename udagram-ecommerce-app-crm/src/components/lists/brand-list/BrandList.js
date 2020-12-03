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
        return <h4>You have no brand. Please click on create button to create your own brand! </h4>
    }else{
        return(
            brandList.map((brand)=>(<Brand {...brand} />))
        );
    }
};

export default BrandList;