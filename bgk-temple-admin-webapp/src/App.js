import React, { Component } from 'react';
import SignIn from './SignIn'
import MainAppBar from './MainAppBar'
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import Route from 'react-router-dom/Route'
import HomePage from './HomePage'

export class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact strict render={
          () => {
            return (
            <div>
                <MainAppBar></MainAppBar>
                <SignIn></SignIn>
            </div>);
          }
        }>
        </Route>
        <Route path="/home" exact strict component={HomePage}/>
      </Router>
    );
  }
}

export default App;
