import React, { Component, Fragment } from 'react';
import './App.css';


const Result = ({ result }) => (
  <div>{result}</div>
);

class Button extends React.Component {
  handleClick = () => {
    const { incrementer, step } = this.props;
    incrementer(step);
  };
  
  render() {
    const { step } = this.props;
    return (
      <button onClick={this.handleClick}>
        +{step}
      </button>
    );
  }
}

class App extends React.Component {
  state = {
    count: 0,
  };
  
  increment = (step) => {
    this.setState(prevState => ({
      count: prevState.count + step,
    }));
  };
  
  render() {
    return (
      <Fragment>
        <Button incrementer={this.increment} step={1}/>
        <Button incrementer={this.increment} step={5}/>
        <Button incrementer={this.increment} step={10}/>
        <Button incrementer={this.increment} step={100}/>
        <Result result={this.state.count}/>
      </Fragment>
    );
  }
}

export default App;
