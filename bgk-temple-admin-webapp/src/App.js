import React from 'react';
import SignIn from './SignIn'
import MainAppBar from './MainAppBar'
import './App.css';

function App() {
  return (
    <div className="App">
        <MainAppBar></MainAppBar>
        <SignIn></SignIn>
    </div>
  );
}

export default App;
