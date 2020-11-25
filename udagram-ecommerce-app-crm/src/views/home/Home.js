import React, { Fragment } from 'react';

import Banner from './Banner';
import Introduction from './Introduction';

const Home = ()=>(
    <Fragment>
        <Banner />
        <hr />
        <Introduction />
    </Fragment>
);

export default Home;