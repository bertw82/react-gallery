import React from 'react';
import Pics from './Pics';
import NoPics from './NoPics';

const PhotoContainer = props => {
    const results = props.data;
    const loading = props.loading;
    let pictures;

    if (loading) {
      pictures = <h1>Loading...</h1>;
    } else if (results.length > 0) {
      pictures = results.map(pic =>
        <Pics url={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`} key={pic.id} title={pic.title} />);
    } else {
      pictures = <NoPics />
    }

    return (
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
                { pictures }
            </ul>
        </div>
    );
}

export default PhotoContainer;