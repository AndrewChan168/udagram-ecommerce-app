import React from 'react';
import IntroductionCardWrapper from '../../components/cards/introduction-card/IntroductionCardWrapper';

const Introduction = ()=>(
    <div className="introduction-table">
        <h4>Introduction to usage of this project</h4>
        <div className="row">
            <IntroductionCardWrapper component={
                {
                    header:'Authentication', 
                    content:'This project uses Auth0 for authenticating users. Click on Login button to route to Auth0 login page. You will be redirected to this page after authenication.'
                }}
            />
            <IntroductionCardWrapper component={
                {
                    header:'Start to use', 
                    content:'First create a new for yourself in Brand page. After that you could find your brands in Products page. Click on the brand name that you want to create/modify/delete your products, then all products belong to that brand would be displayed.'
                }}
            />
        </div>
    </div>
);

export default Introduction;