import React, { Component } from 'react';
import Pics from './Pics';
import NoPics from './NoPics';
import { withRouter } from 'react-router-dom';

class PhotoContainer extends Component {

  componentDidUpdate(prevProps) {
    const prevPropsSearch = prevProps.location.pathname.slice(16);
    const propsSearch = this.props.location.pathname.slice(16);
    if (this.props.location.pathname.includes('search_results')) {
      if (this.props.location.pathname !== prevProps.location.pathname) {
        this.props.onSearch(propsSearch);
      } else {
        this.props.onSearch(prevPropsSearch);
      }
    };
  }
    
  render() {
    const results = this.props.data;
    const dataType = this.props.dataType;
    let pictures;

    if (dataType === "preset") {
      if (results.length > 0) {
        pictures = results.map(pic =>
          <Pics url={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`} key={pic.id} title={pic.title} />);
      } else {
        pictures = <h2>Wait a second...</h2>
      }
    } else {
      if (results.length > 0) {
        pictures = results.map(pic =>
          <Pics url={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`} key={pic.id} title={pic.title} />);
      } else {
        pictures = <NoPics />
      }
    }
    

    return (
      <div className="photo-container">
          <h2>{this.props.title.toUpperCase()}</h2>
          <ul>
              { pictures }
          </ul>
      </div>
    );
  }
}

export default withRouter(PhotoContainer);