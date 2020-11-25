import React from 'react';

const Product = (props)=>{
    const {item} = props;

    return(
        <li className="list-group-item" key={item.itemId}>
            <img src={`${item.thumbnailUrl}`}/>
            <h5>{item.itemName}</h5>
            <p>Price: {`${item.price}`}</p>
        </li>
    );
}

const ProductList = (props)=>{
    const { items } = props;

    return(
        <div className="card-body">
            <ul className="list-group list-group-flush">
                {items.map(item=>(<Product item={item}/>))}
            </ul>
        </div>
    );
}

export default ProductList;