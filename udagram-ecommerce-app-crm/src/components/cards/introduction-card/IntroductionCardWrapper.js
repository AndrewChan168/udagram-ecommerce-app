import React from 'react';

const IntroductionCardWrapper = ({component})=>(
    <div className="col-md-5 mb-4">
        <h6 className="mb-3">{component.header}</h6>
        <p>{component.content}</p>
    </div>
);

export default IntroductionCardWrapper;