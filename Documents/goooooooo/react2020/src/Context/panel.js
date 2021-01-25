import React, { Component } from 'react';
import './index.css';

// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');

export default class Panel extends Component {
  state = {
    color: 'red',
  };
  changeColor = (color) => {
    this.setState({ color });
  };
  render() {
    let value = {
      color: this.state.color,
      changeColor: this.changeColor,
    };
    let style = {
      height: '260px',
      width: '400px',
      border: `3px solid ${this.state.color}`,
    };
    return (
      <>
        <ThemeContext.Provider value={value}>
          <div style={style}>
            <Header />
            <Main />
          </div>
        </ThemeContext.Provider>
      </>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Header() {
  return (
    <ThemeContext.Consumer>
      {(value) => (
        <div className="context" style={{ border: `3px solid ${value.color}` }}>
          <p>Header</p>
          <Title />
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

class Title extends React.Component {
  static contextType = ThemeContext;
  render() {
    return (
      <p
        className="context"
        style={{ border: `3px solid ${this.context.color}` }}
      >
        Title
      </p>
    );
  }
}

class Main extends React.Component {
  static contextType = ThemeContext;
  changeColor = () => {
    console.log(this.context);
  };
  render() {
    return (
      <div
        className="context"
        style={{ border: `3px solid ${this.context.color}` }}
      >
        <p>Main</p>
        <Content />
      </div>
    );
  }
}

class Content extends React.Component {
  static contextType = ThemeContext;
  render() {
    return (
      <div
        className="context"
        style={{ border: `3px solid ${this.context.color}` }}
      >
        Content
        <button onClick={() => this.context.changeColor('green')}>变绿</button>
        <button onClick={() => this.context.changeColor('red')}>变红</button>
      </div>
    );
  }
}
