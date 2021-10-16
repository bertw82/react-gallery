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
      cats: [],
      sailboats: [],
      sunsets: [],
      mountains: [],
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
  }

  componentDidMount() {
    this.performSearch();
    this.preloadPics();
  }

  preloadPics() {
    const cats = axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`);
    const sailboats = axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sailboats&per_page=24&format=json&nojsoncallback=1`);
    const sunsets = axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sunsets&per_page=24&format=json&nojsoncallback=1`);
    const mountains = axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=mountains&per_page=24&format=json&nojsoncallback=1`);
    
    Promise.all([cats, sailboats, sunsets, mountains])
      .then(response => {
        this.setState({
          cats: response[0].data.photos.photo,
          sailboats: response[1].data.photos.photo,
          sunsets: response[2].data.photos.photo,
          mountains: response[3].data.photos.photo,
        });
      });
  }

  performSearch(query = "mountains") {
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
                <Route exact path="/" render={ () => 
                  <Redirect to="/mountains"/>} />
                <Route path="/mountains" render={ () => 
                  <PhotoContainer 
                    data={this.state.mountains} 
                    dataType={"preset"}
                    title={"Mountains"}  
                  />} 
                />
                <Route path="/cats" render={ () => 
                  <PhotoContainer 
                    data={this.state.cats} 
                    dataType={"preset"}
                    title={"Cats"} 
                  /> } 
                />
                <Route path="/sailboats" render={ () => 
                  <PhotoContainer 
                    data={this.state.sailboats} 
                    dataType={"preset"}
                    title={"Sailboats"} 
                  /> } 
                />
                <Route path="/sunsets" render={ () => 
                  <PhotoContainer 
                    data={this.state.sunsets} 
                    dataType={"preset"}
                    title={"Sunsets"} 
                  /> } 
                />
                <Route path="/search_results/:query" render={ () => 
                  <PhotoContainer 
                    data={this.state.pics} 
                    loading={this.state.loading} 
                    title={this.state.query} 
                    onSearch={this.performSearch}
                  /> } 
                /> 
              </Switch>
          }
        </div>
      </BrowserRouter>
      
    );
  }
}

