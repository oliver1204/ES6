import React, { Component } from 'react';
import User from './user';
import Form from './form';

class RefComponent extends Component {
  constructor(props) {
    super(props);
    this.user = React.createRef(); // {current: null}
  }
  state = {
    first: null,
    third: React.createRef(),
  };
  getFirstValue = () => {
    this.setState({
      first: this.refs.first.value,
    });
  };
  getSecondValue = () => {
    this.setState({
      second: this.state.second.value,
    });
  };
  getThirdValue = () => {
    // this.setState({
    //   thirdValue: this.state.third.current.value,
    // });
    console.log(this.state.third.current.value);
  };
  getFocus = (event) => {
    this.user.current.userInput.current.focus();
  };
  render() {
    return (
      <>
        <h1>1. React 的生命周期</h1>
        <h2>1. 使用的方式</h2>
        <section>
          <h3>1.1 字符串定义（已废弃）</h3>
          <p>这个方案已经不被 react 官方推荐，而且会在未来的版本中移除。</p>

          <div className="code">
            <input type="text" defaultValue="First" ref="first" />
            <button onClick={this.getFirstValue}>获取 ref</button>
            {this.state.first}
          </div>
        </section>
        <section>
          <h3>1.2 使用回调函数（不推荐）</h3>
          <p>
            ref的值是一个函数的时候，那么函数会在虚拟dom转化为真实dom后执行，参数就是此真实dom
          </p>
          <div className="code">
            <input
              type="text"
              defaultValue="Second"
              ref={(input) => (this.state.second = input)}
            />
            <button onClick={this.getSecondValue}>获取 ref</button>
            {this.state.second}
          </div>
        </section>
        <section>
          <h3>1.3 使用 React.createRef()（推荐）</h3>
          <p>
            在 react 16.3 中，您将能够使用新的 React.createref() 函数使 ref
            创建变得更容易。
          </p>
          <div className="code">
            <input type="text" defaultValue="Third" ref={this.state.third} />
            <button onClick={this.getThirdValue}>获取 ref</button>
          </div>
        </section>
        <h2>2. 跨类组件传ref值</h2>
        <section>
          <>
            {/* this.user = new User() */}
            <User ref={this.user} />
            <button onClick={this.getFocus}>让User组件获取焦点</button>
          </>
        </section>
        <h2>3. 跨函数组件传ref值</h2>
        <Form />
      </>
    );
  }
}

export default RefComponent;
