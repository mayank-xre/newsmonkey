import './App.css';
import Navbar from './components/NavBar';
import React, { useState } from 'react'
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const [progress, setprogr] = useState(0)
  const [mode, setmode] = useState("light")
  let apik=process.env.REACT_APP_NEWS_API_KEY
  const setprog=(progr)=>{
    setprogr(progr);
  }
  const togglemode=()=>{
    if(mode==="light"){
      setmode("dark")
      document.body.style.backgroundColor='black'
    }
    else{
      setmode("light")
      document.body.style.backgroundColor="white"
    }
  }
    return (
      <div>
        <Router>
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
          <Navbar mode={mode} togglem={togglemode}></Navbar>
          <Switch>
            <Route exact path="/"><News apikey={apik} progf={setprog} pagesize={15} mode={mode} key={1} category=""></News></Route>
            <Route exact path="/business"><News apikey={apik} progf={setprog} pagesize={10} mode={mode} category="business" key={2}></News></Route>
            <Route exact path="/general"><News apikey={apik} progf={setprog} pagesize={10} mode={mode} category="general" key={4}></News></Route>
            <Route exact path="/health"><News apikey={apik} progf={setprog} pagesize={10} mode={mode} category="health" key={5}></News></Route>
            <Route exact path="/entertainment"><News apikey={apik} progf={setprog} pagesize={10} mode={mode} category="entertainment" key={5}></News></Route>
            <Route exact path="/science"><News apikey={apik} progf={setprog} pagesize={10} mode={mode} category="science" key={6}></News></Route>
            <Route exact path="/sports"><News apikey={apik} progf={setprog} pagesize={10} mode={mode} category="sports" key={7}></News></Route>
            <Route exact path="/technology"><News apikey={apik} progf={setprog} pagesize={10} mode={mode} category="technology" key={8}></News></Route>
          </Switch>
        </Router>
      </div>
    )
}
export default App