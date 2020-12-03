import React from 'react';

const Product = (props)=>{
    const {item} = props;

    return(
        <ul className="list-group list-group-flush">
            <li className="list-group-item" key={item.itemId}>
                <img src={`${item.thumbnailUrl}`}/>
                <h5>{item.itemName}</h5>
                <p>Price: {`${item.price}`}</p>
            </li> 
        </ul>
    );
}

const ProductList = (props)=>{
    const { items } = props;

    if(items.length===0){
        return <h5>This brand has no product. You may create item for this brand by clicking create button</h5>
    }else{
        return(
            <div className="card-body">
                    {items.map(item=>(<Product item={item}/>))}
            </div>
        );
    }
}

export default ProductList;