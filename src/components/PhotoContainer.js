import React, { Component } from 'react';
import Pics from './Pics';
import NoPics from './NoPics';
import { withRouter } from 'react-router-dom';

class PhotoContainer extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname.includes('search_results')) {
      if (this.props.location.pathname !== prevProps.location.pathname) {
        this.props.onSearch(this.props.location.pathname.slice(16));
        this.props.onChange(this.props.location.pathname.slice(16));
      } 
      else {
        this.props.onSearch(prevProps.location.pathname.slice(16));
        this.props.onChange(prevProps.location.pathname.slice(16));
      }
    }
  }
    
  render() {
    const results = this.props.data;
    let pictures;

    if (results.length === 0) {
      pictures = <NoPics />
    } else {
      pictures = results.map(pic =>
        <Pics url={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`} key={pic.id} title={pic.title} />);
    }

    console.log(this.props);
    console.log(this.prevProps)

    return (
      <div className="photo-container">
          <h2>{this.props.title}</h2>
          <ul>
              { pictures }
          </ul>
      </div>
    );
  }
}

export default withRouter(PhotoContainer);