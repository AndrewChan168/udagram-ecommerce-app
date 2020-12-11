import React, {useContext} from 'react';
import {BrandsContext} from './../../../contexts/BrandsContext';
import PencilSquare from './../../../assets/img/pencil-square.svg';

const Brand = (props)=>{
    const { brandId,brandName,description } = props;
    const { setIsCreate, setBrandId, setBrandName, setDescription} = useContext(BrandsContext);

    const onClick = ()=>{
        setBrandId(brandId);
        setBrandName(brandName);
        setDescription(description);
        setIsCreate(false);
    }

    return(
        <div className="card" key={brandId}>
            <div className="card-body">
                <h5 className="card-title">{brandName}</h5>
                <p className="card-text">{description}</p>
                <button 
                    className="btn btn-primary" 
                    data-toggle="modal" 
                    data-target={`#brand-modal`}
                    onClick={onClick}
                >
                    <img src={PencilSquare}  alt="" width="24" height="24" title="Bootstrap" />
                </button>
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