import React from 'react';

const CreateAdminButton = (props)=>{
    const {onClickHandler} = props;

    return(
        <button
            className="btn btn-primary btn-block"
            onClick={()=>onClickHandler()}
        >
            Register as Admin
        </button>
    );
}

export default CreateAdminButton;