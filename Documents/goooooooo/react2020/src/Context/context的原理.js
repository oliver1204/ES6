import React, { Component } from 'react';

function createContext(initValue) {
  let contextValue = initValue;
  class Provider extends Component {
    constructor(props) {
      super(props);
      contextValue = props.value;
    }
    render() {
      contextValue = props.value;
      return this.props.children;
    }
  }
  class Consumer extends Component {
    render() {
      return this.props.children(contextValue);
    }
  }

  return { Provider, Consumer };
}
export default createContext;
