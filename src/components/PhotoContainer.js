import React from 'react';
import Pics from './Pics';
import NoPics from './NoPics';

const PhotoContainer = props => {

    const results = props.data;
    let pictures = results.map(pic =>
        <Pics url={pic.images.fixed_height.url} key={pic.id} />
    );

    return (
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
                {results.length > 0 
                    ? pictures
                    : <NoPics />
                }
            </ul>
        </div>
    );
}

export default PhotoContainer;