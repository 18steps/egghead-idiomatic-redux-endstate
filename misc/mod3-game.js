import React, { Component, Fragment } from 'react';
import { FaStar, FaCheck, FaTimesCircle, FaRefresh } from 'react-icons/lib/fa';

import './App.css';

const possibleCombinationSum = (arr, n) => {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[ 0 ] > n) { return false; }
  if (arr[ arr.length - 1 ] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  const listSize = arr.length, combinationsCount = (1 << listSize);
  for (let i = 1; i < combinationsCount; i++) {
    let combinationSum = 0;
    for (let j = 0; j < listSize; j++) {
      if (i & (1 << j)) { combinationSum += arr[ j ]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

const Star = (props) => (
  <span className={'star'}><FaStar color={'red'} /></span>
);

const Stars = (props) => (
  <div className={'col-5'}>
    {Array(props.numStars).fill(0).map((i, index) =>
      <Star key={index} />,
    )}
  </div>
);

const Buttons = (props) => {
  let button;
  switch (props.isAnswerCorrect) {
    case true:
      button =
        <button
          className={'btn btn-success'}
          onClick={props.acceptAnswer}
        >
          <FaCheck />
        </button>;
      break;
    case false:
      button =
        <button
          className={'btn btn-danger'}>
          <FaTimesCircle />
        </button>;
      break;
    default:
      button =
        <button
          className={'btn'}
          disabled={!props.selectedNumbers.length}
          onClick={props.checkAnswer}
        >
          =
        </button>;
      break;
  }
  return (
    <div className={'col-2 text-center'}>
      {button}
      <br /><br />
      <button
        className="btn btn-warning btn-sm"
        disabled={props.redrawsRemaining === 0}
        onClick={props.redrawStars}
      >
        <FaRefresh />
        <br />
        {props.redrawsRemaining}
      </button>
    </div>
  );
};

const Answer = (props) => (
  <div className="col-5">
    {props.selectedNumbers.map(num =>
      <span
        key={num}
        onClick={() => props.unselectNumber(num)}>
        <Number>{num}</Number>
      </span>,
    )}
  </div>
);

const Number = (props) => (
  <span
    className={`number ${props.selected
      ? 'selected'
      : ''} ${props.used
      ? 'used'
      : ''}`}>{props.children}</span>
);

class Numbers extends Component {

  isSelected = num => this.props.selectedNumbers.includes(num);
  isUsed = num => this.props.usedNumbers.includes(num);

  render() {
    const { isSelected, isUsed, props: { selectNumber } } = this;
    return (
      <div className="card text-center">
        <div>
          {Game.allNumbers.map(num =>
              <span
                key={num}
                onClick={() => !isSelected(num) && !isUsed(num)
                  ? selectNumber(num)
                  : void 0}>
          <Number
            selected={isSelected(num)}
            used={isUsed(num)}
          >{num}</Number>
        </span>,
          )}
        </div>
      </div>
    );
  }
}

const DoneFrame = (props) => (
  <div className={'text-center'}>
    <h2>{props.doneStatus}</h2>
    <button
      className={'btn btn-secondary'}
      onClick={props.resetGame}>Play Again
    </button>
  </div>
);

class Game extends Component {
  static maxNumber = 9;
  static maxRedraws = 90;

  static get allNumbers() { return Array(Game.maxNumber).fill(0).map((i, index) => index + 1); }

  static get randNumStars() { return Math.ceil(Math.random() * Game.maxNumber); }

  static defaultState = {
    selectedNumbers: [],
    usedNumbers: [],
    numStars: Game.randNumStars,
    isAnswerCorrect: null,
    redrawsRemaining: Game.maxRedraws,
    doneStatus: null,
  };

  state = Game.defaultState;

  selectNumber = (num) => {
    if (this.state.selectedNumbers.includes(num)) return;

    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.concat([ num ]),
    }));
  };

  unselectNumber = (num) => {
    if (!this.state.selectedNumbers.includes(num)) return;

    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.filter(selected => selected !== num),
    }));
  };

  checkAnswer = () => {
    this.setState(prevState => ({
      isAnswerCorrect:
      prevState.selectedNumbers.reduce((memo, num) => memo + num, 0)
      === prevState.numStars,
    }));
  };

  acceptAnswer = () => {
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      isAnswerCorrect: null,
      numStars: Game.randNumStars,
    }), this.updateDoneStatus);
  };

  redrawStars = () => {
    this.setState(prevState => ({
      numStars: Game.randNumStars,
      redrawsRemaining: prevState.redrawsRemaining - 1,
      selectedNumbers: [],
      isAnswerCorrect: null,
    }), this.updateDoneStatus);
  };

  possibleSolutions = ({ numStars, usedNumbers }) => {
    const possibleNumbers = Game.allNumbers.filter(num => !usedNumbers.includes(num));
    return possibleCombinationSum(possibleNumbers, numStars);
  };

  updateDoneStatus = () => {
    this.setState(prevState => {
      if (prevState.usedNumbers.length === Game.maxNumber)
        return { doneStatus: 'Done. Nice!' };
      if (prevState.redrawsRemaining === 0 && !this.possibleSolutions(prevState))
        return { doneStatus: 'Game over!' };
    });
  };

  resetGame = () => this.setState(Game.defaultState);

  render() {
    const { numStars, selectedNumbers, isAnswerCorrect, usedNumbers, redrawsRemaining, doneStatus } = this.state;
    return (
      <div className={'container'}>
        <h3>Play Nine</h3>
        <hr />
        <div className={'row'}>
          <Stars numStars={numStars} />
          <Buttons
            selectedNumbers={selectedNumbers}
            checkAnswer={this.checkAnswer}
            isAnswerCorrect={isAnswerCorrect}
            acceptAnswer={this.acceptAnswer}
            redrawStars={this.redrawStars}
            redrawsRemaining={redrawsRemaining}
          />
          <Answer
            selectedNumbers={selectedNumbers}
            unselectNumber={this.unselectNumber}
          />
        </div>
        <br />
        {!!doneStatus
          ? <DoneFrame
            doneStatus={doneStatus}
            resetGame={this.resetGame}
          />
          : <Numbers
            selectedNumbers={selectedNumbers}
            selectNumber={this.selectNumber}
            usedNumbers={usedNumbers}
          />}
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Fragment>
        <Game />
      </Fragment>

    );
  }
}

export default App;
