import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import apiKey from './config';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      pics: []
    };
    this.navButtons = {
      nav1: "Cats",
      nav2: "Sailboats",
      nav3: "Sunsets"
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
          <Nav navButtons={this.navButtons}/>
          <PhotoContainer data={this.state.pics} />
        </div>
    );
  }
}

