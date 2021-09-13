import React from 'react';
import Pics from './Pics';
import NoPics from './NoPics';

const PhotoContainer = props => {
    const results = props.data;
    const loading = props.loading;
    let pictures = results.map(pic =>
        <Pics url={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`} key={pic.id} title={pic.title} />
    );

    return (
        <div className="photo-container">
            <h2>Results</h2>
            <ul>{
                  (() => {
                    if (loading) {
                        return (
                          <h1>Loading...</h1>
                        )
                    } else if (results.length > 0) {
                      return (pictures)
                    } else {
                      return (
                        <NoPics />
                      )
                    }
                  })()   
                }
            </ul>
        </div>
    );
}

export default PhotoContainer;