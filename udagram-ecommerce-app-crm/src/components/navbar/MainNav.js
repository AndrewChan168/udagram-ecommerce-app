import React from 'react';
import {NavLink} from 'react-router-dom';

const MainNav = ()=>(
    <div className="navbar-nav mr-auto">
        <NavLink to="/" 
            exact 
            className="nav-link" 
            activeClassName="router-link-exact-active"
        >Home</NavLink>
        <NavLink to="/profile" 
            exact 
            className="nav-link" 
            activeClassName="router-link-exact-active"
        >Profile</NavLink>
        <NavLink to="/brands" 
            exact 
            className="nav-link" 
            activeClassName="router-link-exact-active"
        >Brands</NavLink>
        <NavLink to="/products" 
            exact 
            className="nav-link" 
            activeClassName="router-link-exact-active"
        >Products</NavLink>
    </div>
);

export default MainNav;