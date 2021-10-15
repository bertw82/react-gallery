import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
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
      mountains: [],
      cats: [],
      sailboats: [],
      sunsets: [],
      query: '',
      loading: false
    };
    this.navButtons = {
      nav1: "Cats",
      nav2: "Sailboats",
      nav3: "Sunsets"
    };
    this.performSearch = this.performSearch.bind(this);
    this.preloadPics = this.preloadPics.bind(this);
    this.changeQuery = this.changeQuery.bind(this);
  }

  componentDidMount() {
    this.performSearch();
    this.preloadPics();
  }

  preloadPics() {
    const mountains = axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=mountains&per_page=24&format=json&nojsoncallback=1`);
    const cats = axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`);
    const sailboats = axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sailboats&per_page=24&format=json&nojsoncallback=1`);
    const sunsets = axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sunsets&per_page=24&format=json&nojsoncallback=1`);
    
    Promise.all([mountains, cats, sailboats, sunsets])
      .then(response => {
        this.setState({
          mountains: response[0].data.photos.photo,
          cats: response[1].data.photos.photo,
          sailboats: response[2].data.photos.photo,
          sunsets: response[3].data.photos.photo,
        });
      });
  }

  performSearch(query) {
    this.setState({loading: true})
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(response => {
        this.setState({   
          query,
          pics: response.photos.photo,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });    
  }

  changeQuery(newQuery) {
    this.setState({
      query: newQuery
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <SearchForm onSearch={this.performSearch} />
          <Nav navButtons={this.navButtons} />
          {
            (this.state.loading)
            ? <h2>Loading...</h2>
            : <Switch>
                {/* <Route exact path="/" render={ () => 
                  <Redirect to="/mountains"/>} /> */}
                <Route exact path="/" render={ () => 
                  <PhotoContainer 
                    data={this.state.mountains} 
                    title={"MOUNTAINS"}  
                  />} 
                />
                <Route path="/cats" render={ () => 
                  <PhotoContainer 
                    data={this.state.cats} 
                    title={"CATS"} 
                  /> } 
                />
                <Route path="/sailboats" render={ () => 
                  <PhotoContainer 
                    data={this.state.sailboats} 
                    title={"SAILBOATS"} 
                  /> } 
                />
                <Route path="/sunsets" render={ () => 
                  <PhotoContainer 
                    data={this.state.sunsets} 
                    title={"SUNSETS"} 
                  /> } 
                />
                <Route path="/search_results/:query" render={ () => 
                  <PhotoContainer 
                    data={this.state.pics} 
                    loading={this.state.loading} 
                    title={this.state.query} 
                    onSearch={this.performSearch}
                    onChange={this.changeQuery}
                  /> } 
                /> 
              </Switch>
          }
        </div>
      </BrowserRouter>
      
    );
  }
}

