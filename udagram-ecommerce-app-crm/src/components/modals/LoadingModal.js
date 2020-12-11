import React from 'react';

import Loading from './../../views/Loading'

const LoadingModal = ()=>(
    <div className="modal" id={`brand-modal`}>
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Loading...</h5>
                </div>
                <div className="modal-body">
                    <Loading />
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
);

export default LoadingModal;