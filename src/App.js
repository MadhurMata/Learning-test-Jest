import React, { Component } from 'react'

import './App.css';



export default class App extends Component {
    state = {
      counter: 0,
      errorMessage: false
    };

    decrementCounter = () =>{
      if (this.state.counter === 0) {
        this.setState({ errorMessage: true })
      } else {
        this.setState({ counter: this.state.counter -1 })
      }
    }

    incrementCounter =() => {
      if (this.state.errorMessage) {
        this.setState({ errorMessage: false})
      }
      this.setState({ counter: this.state.counter + 1 })
    }
  
  render() {
    const errorClass = this.state.errorMessage ? "" : 'hidden';
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display"> The counter is currently {this.state.counter}</h1>
        <div data-test="error-message" className={`error ${errorClass}`}>The counter can't go below 0</div>
        <button 
          onClick={this.incrementCounter} 
          data-test="increment-button">Increment counter</button>
        <button 
          onClick={this.decrementCounter}
          data-test="decrement-button" >Decrement counter</button>
    </div>
    )
  }
}



