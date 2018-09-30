import React, { Component } from 'react'
import 'antd/dist/antd.css'
import logo from './logo.svg'
import './App.css'
import Sample from './component/Sample'
import { DatePicker } from 'antd'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Sample />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
