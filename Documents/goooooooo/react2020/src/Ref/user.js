import React, { Component } from 'react';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.userInput = React.createRef();
  }
  render() {
    return <input type="text" defaultValue="user" ref={this.userInput} />;
  }
}
