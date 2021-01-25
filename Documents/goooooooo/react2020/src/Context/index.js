import React, { Component } from 'react';
import Panel from './panel';

export default class Context extends Component {
  render() {
    return (
      <>
        <h1>3. Context</h1>
        <a href="https://zh-hans.reactjs.org/docs/context.html">官方文档</a>
        <p>
          Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树
        </p>
        <p>下面是一个主题色的例子：</p>
        <Panel />
      </>
    );
  }
}
