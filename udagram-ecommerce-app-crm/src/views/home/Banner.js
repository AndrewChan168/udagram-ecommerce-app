import React from 'react';

const Banner = ()=>(
    <div className="text-center hero">
        <img className="mb-3 app-logo" width="120" src={"https://d20vrrgs8k4bvw.cloudfront.net/images/open-graph/udacity.png"}/>
        <h1>AWS Serverless Sample Project</h1>
        <p className="lead">
            This is a sample project, which demonstrates an OAuth authentication flow hosted by AWS with AWS cloudformation, for Udacity Cloud Developer Nano-degree.
        </p>
        <hr />
        <p className="tail">
            This sample project acts as CRM of an E-Commerce website for Pet Supplies. Pet Suppliers could create their brand and their products.
        </p>
    </div>
);

export default Banner;