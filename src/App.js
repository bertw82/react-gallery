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
      pics: [],
      cats: [],
      sailboats: [],
      sunsets: [],
    };
    this.navButtons = {
      nav1: "Cats",
      nav2: "Sailboats",
      nav3: "Sunsets"
    };
    this.performSearch = this.performSearch.bind(this);
    this.preloadPics = this.preloadPics.bind(this);
  }

  componentDidMount() {
    this.performSearch();
    this.preloadPics();
  }

  preloadPics() {
    const cats = axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`);
    const sailboats = axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sailboats&per_page=24&format=json&nojsoncallback=1`);
    const sunsets = axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sunsets&per_page=24&format=json&nojsoncallback=1`);

    Promise.all([cats, sailboats, sunsets])
      .then(response => {
        this.setState({
          cats: response[0].data.photos.photo,
          sailboats: response[1].data.photos.photo,
          sunsets: response[2].data.photos.photo
        });
      });
  }

  performSearch(query) {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        console.log(response);
        this.setState({
          pics: response.data.photos.photo,
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });    
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <SearchForm onSearch={this.performSearch} />
          <Nav navButtons={this.navButtons} />
          <Switch>
            <Route path="/cats" render={ () => <PhotoContainer data={this.state.cats}/> } />
            <Route path="/sailboats" render={ () => <PhotoContainer data={this.state.sailboats}/> } />
            <Route path="/sunsets" render={ () => <PhotoContainer data={this.state.sunsets}/> } />
            <Route path="/search_results" render={ () => <PhotoContainer data={this.state.pics} search={this.performSearch}/> } /> 
          </Switch>
        </div>
      </BrowserRouter>
      
    );
  }
}

