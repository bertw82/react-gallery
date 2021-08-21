import React from 'react';
import ButtonUl from './ButtonUl';

const buttonNames = ['Cats', 'Dogs', 'Computers'];

const Buttons = () => {
    return (
        <nav className="main-nav">
           <ButtonUl value={buttonNames}/>
        </nav>
    );
}

export default Buttons;