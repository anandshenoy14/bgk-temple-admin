import React, { Component } from 'react';
import SignIn from './SignIn'
import MainAppBar from './MainAppBar'
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Route from 'react-router-dom/Route'
import HomePage from './HomePage'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      "isSignedIn": false,
      "appController": undefined,
      "firebaseApp": undefined
    }
  }
  componentDidMount() {
    const fetchConfig = function () {
      let p = new Promise((resolve, reject) => {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", function () {
          let responseJSON = JSON.parse(this.responseText);
          resolve(responseJSON);
        });
        oReq.open("GET", "https://bgkconfig.herokuapp.com/config", true);
        oReq.send();
      })
      return p;
    }
    async function initializeFireBaseApp() {
      const configs = await fetchConfig();
      const app = firebase.initializeApp({
        apiKey: configs["BGK_FIREBASE_KEY"],
        authDomain: configs["BGK_FIREBASE_DOMAIN"],
        projectId: "bennegopalkrishnatmplproj",
        databaseURL: "https://bennegopalkrishnatmplproj.firebaseio.com"
      })
      return app;
    }
    //initialize firebase app
    initializeFireBaseApp().then(app => {
      const controller = firebase.auth(app);
      const isSignedIn = controller.currentUser != null
      this.setState({
        "isSignedIn": isSignedIn,
        "appController": controller,
        "firebaseApp": app
      })
    });
  }
  async fireStoreDataFetcher() {
    const collectionKey = "devotees"; //name of the collection 
    const firestore = firebase.firestore(this.state["firebaseApp"]);
    const querySnapshot = await firestore.collection(collectionKey).where("City", "==", "Mumbai").limit(5).get();
    const data = []
    querySnapshot.forEach(function (doc) {
      let record = {};
      Object.assign(record, doc.data())
      record["id"] = doc.id;
      data.push(record)
    });
    return data;
  }
  signIn(email, password) {
    this.state["appController"].signInWithEmailAndPassword(email, password).then((cred) => {
      this.setState({
        "isSignedIn": true
      })
    }).catch((err) => {
      var errorCode = err.code;
      var errorMessage = err.message;
      if (errorCode === 'auth/wrong-password') {
        this.setState({
          "signInError": true,
          "errorMessage" : "Wrong Password.Try Again!"
        })
        console.log('Wrong password.');
      } else {
        console.log(errorMessage);
      }
      console.log(err);
    })
  }
  signOut() {
    this.state["appController"].signOut().then(() => {
      console.log('Successfully Signed Out')
      this.setState({ "isSignedIn": false });
    }).catch(function (error) {
      // An error happened.
    });
  }
  render() {
    return (
      <Router>
        <Route path="/" exact strict render={
          () => {
            return (
              <div>
                {this.state.isSignedIn ? (<HomePage signOutController={this.signOut.bind(this)} fireStoreDataFetcher={this.fireStoreDataFetcher.bind(this)}></HomePage>) : 
                                          (<><MainAppBar></MainAppBar><SignIn error={this.state.signInError} errorMessage={this.state.errorMessage} signInController={this.signIn.bind(this)}></SignIn></>)}
              </div>);
          }
        }>
        </Route>
        <Route path="/home" exact strict component={HomePage} />
      </Router>
    );
  }
}

export default App;
