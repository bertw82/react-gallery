import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = props => {
    const { nav1, nav2, nav3 } = props.navButtons;
    return (
        <nav className="main-nav">
            <ul>
                <li><NavLink to="/cats" >{nav1}</NavLink></li>
                <li><NavLink to="/sailboats">{nav2}</NavLink></li>
                <li><NavLink to="/sunsets">{nav3}</NavLink></li>
            </ul>
        </nav>
    );
}

export default Nav;