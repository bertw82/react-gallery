import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import SearchForm from './SearchForm';
import Buttons from './Buttons';
import PhotoContainer from './PhotoContainer';
import apiKey from '../config';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      pics: []
    };
    this.performSearch = this.performSearch.bind(this);
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch(query) {
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=${apiKey}`)
      .then(response => {
        this.setState({
          pics: response.data.data
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });    
  }

  render() {
    console.log(this.state.pics)
    return (
        <div className="container">
          <Header />
          <SearchForm onSearch={this.performSearch} />
          <Buttons />
          <PhotoContainer data={this.state.pics} />
        </div>
    );
  }
}

