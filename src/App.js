//import logo from './logo.svg';
import './App.css';
import "./components/NavBar"
import React, { Component } from 'react'
import Navbar from './components/NavBar';
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <News></News>
      </div>
    )
  }
}
