import React, { Component } from 'react';
import DerivedStateFromProps from './DerivedStateFromProps';
import SnapshotBeforeUpdate from './SnapshotBeforeUpdate';

class LifeCycle extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <h1>2. LifeCycle</h1>

        <p>
          React16.4新增了 getDerivedStateFromProps 、getSnapshotBeforeUpdate
          、componentDidCatch(捕获报错用的，Suspense的实现原理)
          三个生命周期，删除了componentWillMount、componentWillReceiveProps、componentWillUpdate三个生命周期。
        </p>
        <p>
          之所以有这个改变主要是在 react 16 中 react 公布了新的API -- Time Slice
          和 Suspense(悬停).
        </p>
        <h2>1. getDerivedStateFromProps</h2>
        <p>
          getDerivedStateFromProps是一个静态方法，所以不能在这个函数里面使用this，这个函数有两个参数props和state，分别指接收到的新参数和当前的state对象，这个函数会返回一个对象用来更新当前的state对象，如果不需要更新可以返回null。
        </p>
        <DerivedStateFromProps />

        <h2>2. SnapshotBeforeUpdate</h2>
        <p>实现一个滚动条定格在某一个位置的控件</p>
        <SnapshotBeforeUpdate />
      </>
    );
  }
}
export default LifeCycle;
