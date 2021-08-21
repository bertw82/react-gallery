import React from 'react';

const Pics = props => {
    return (
        <li>
            <img src={props.url} alt=""/>
        </li>
    );
}

export default Pics;