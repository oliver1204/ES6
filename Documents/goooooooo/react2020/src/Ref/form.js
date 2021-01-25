import React, { Component } from 'react';

function User(props, ref) {
  return <input type="text" ref={ref} />;
}

const ForwardedUser = React.forwardRef(User);

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.user = React.createRef();
  }
  getFocus = (event) => {
    this.user.current.focus();
  };
  render() {
    return (
      <>
        <ForwardedUser ref={this.user} />
        <button onClick={this.getFocus}>让User组件获取焦点</button>
      </>
    );
  }
}
