import React from 'react';
import ButtonListItems from './ButtonListItems';

const ButtonUl = props => {
    const values = props.value;
    const listItems = values.map((value, index) => {
        return <ButtonListItems value={value} key={index} />
    });
    return (
        <ul>{listItems}</ul>
    );
}

export default ButtonUl;