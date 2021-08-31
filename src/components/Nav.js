import React from 'react';

const Nav = props => {
    const { nav1, nav2, nav3 } = props.navButtons;
    return (
        <nav className="main-nav">
            <ul>
                <li><a href="#">{nav1}</a></li>
                <li><a href="#">{nav2}</a></li>
                <li><a href="#">{nav3}</a></li>
            </ul>
        </nav>
    );
}

export default Nav;