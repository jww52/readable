import React from 'react'
import logo from '../logo.svg';
import '../App.css';

export default function Header(){
  return(
    <div className="containers">

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Post'n Up</h1>
        </header>
        <p className="App-intro">
          This is it.
        </p>
      </div>
    </div>
  )
}
