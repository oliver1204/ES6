import React, { Component } from 'react';

class ChildComponent extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    number: 0,
  };
  static getDerivedStateFromProps(nextState, preProps) {
    console.log(nextState);
    console.log(preProps);
    return {
      number: nextState.number,
    };
    // return null;
  }
  render() {
    return <p>组件用来显示父组件中的number值： {this.state.number}</p>;
  }
}

export default class DerivedStateFromProps extends Component {
  state = {
    number: 0,
    number2: 0,
    number3: 0,
  };
  add = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };
  render() {
    return (
      <>
        存在于父组件中的按钮：<button onClick={this.add}>+</button>
        <ChildComponent number={this.state.number} />
      </>
    );
  }
}
