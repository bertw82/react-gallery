import React from 'react';

const Pics = props => {
    return (
        <li>
            <img src={props.url} alt={props.title} />
        </li>
    );
}

export default Pics;