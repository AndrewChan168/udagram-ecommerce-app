import React, {useState} from 'react';

const BrandModal = (props)=>{
    const {addBrandHandler} = props;
    const [ brandName, setBrandName ] = useState("");
    const [ description, setDescription ] = useState("");

    const onCreateButtonClickHandler = ()=>{
        if ((brandName!=="")&&(description!=="")){
            const brandJson = JSON.stringify({
                brandName,
                description
            });
            addBrandHandler(brandJson);
        }
    };

    return(
        <div id="brand-modal" className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Creata a new brand</h5>
                        <button className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Brand Name</label>
                                <input 
                                    className="form-control" 
                                    type="text" id="name" 
                                    placeholder="Enter Name" 
                                    onChange={(event)=>setBrandName(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Brand Introduction</label>
                                <textarea 
                                    className="form-control" 
                                    id="message" rows="3" 
                                    placeholder="Write some words on your new Brand"
                                    onChange={(event)=>setDescription(event.target.value)}
                                ></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" data-dismiss="modal" onClick={onCreateButtonClickHandler}>Submit</button>
                        <button className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BrandModal;