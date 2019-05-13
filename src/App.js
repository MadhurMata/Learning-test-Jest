import React, { Component } from 'react'

import './App.css';



export default class App extends Component {
    state= {
      counter: 0
    };

  render() {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display"> The counter is currently {this.state.counter}</h1>
        <button 
          onClick={() => this.setState({ counter: this.state.counter + 1})} 
          data-test="increment-button">Increment counter</button>
        <button 
          onClick={() => this.setState({ counter: this.state.counter -1})}
          data-test="decrement-button" >Decrement counter</button>
    </div>
    )
  }
}



