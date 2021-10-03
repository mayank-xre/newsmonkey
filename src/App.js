//import logo from './logo.svg';
import './App.css';
import "./components/NavBar"
import React, { Component } from 'react'
import Navbar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar></Navbar>
          <Switch>
            <Route exact path="/"><News pagesize={10} key={1}></News></Route>
            <Route exact path="/business"><News pagesize={10} category="business" key={2}></News></Route>
            <Route exact path="/general"><News pagesize={10} category="general" key={4}></News></Route>
            <Route exact path="/health"><News pagesize={10} category="health" key={5}></News></Route>
            <Route exact path="/science"><News pagesize={10} category="science" key={6}></News></Route>
            <Route exact path="/sports"><News pagesize={10} category="sports" key={7}></News></Route>
            <Route exact path="/technology"><News pagesize={10} category="technology" key={8}></News></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}
