import React, { Component } from 'react';
import './snapshotBeforeUpdate.css';

const COLORS = ['red', 'blue', 'yellow', 'green'];

export default class SnapshotBeforeUpdate extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
  }
  state = {
    messages: [],
  };
  addMessage = () => {
    this.setState({
      messages: [`${this.state.messages.length}`, ...this.state.messages],
    });
  };
  componentDidMount() {
    this.$timerID = setInterval(() => {
      this.addMessage();
    }, 1000);
  }
  getSnapshotBeforeUpdate() {
    // 获取当前容器的高度
    return this.container.current.scrollHeight;
  }
  componentWillUnmount() {
    clearInterval(this.$timerID);
  }
  componentDidUpdate(preProps, preState, preScrollHeight) {
    let scrollHeight = this.container.current.scrollHeight;
    let newScrollTop =
      this.container.current.scrollTop + (scrollHeight - preScrollHeight);
    this.container.current.scrollTop = newScrollTop;
  }
  render() {
    let { messages } = this.state;
    return (
      <div className="box" ref={this.container}>
        {messages.map((message, index) => {
          return (
            <div
              className="message"
              style={{ backgroundColor: `${COLORS[index % 4]}` }}
            >
              {message}
            </div>
          );
        })}
      </div>
    );
  }
}
