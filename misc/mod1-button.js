import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// glømte å extende react.component
// class Button {
//   state = {
//     count
//   }
//   increment
// }

// function Button({ count }) {
//   return <button onClick={increment}>{count}</button>;
// }

// const App = () => Button({ text: 'Yo' });
// const App = () => <Button text='yolo' />;

const Result = ({ result }) => (
  <div>{result}</div>
);

// const Button = ({ incrementer, step }) => (
//   <button onClick={() => incrementer(step)}>
//     +{step}
//   </button>
// );

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
    count: 2,
  };
  
  // constructor(props = {}) {
  //   super(props);
  //   const { count } = props;
  //   (count !== undefined)
  //     ? this.state.count = count
  //     : void 0;
  // }
  
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
