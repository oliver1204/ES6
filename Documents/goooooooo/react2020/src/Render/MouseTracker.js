import React, { Component } from 'react';
import { ReactDOM } from 'react-dom';
import './MouseTracker.css';

class MouseTracker extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    x: 0,
    y: 0,
  };
  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };
  render() {
    return (
      <div className="box" onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

// class MyMouseTracker extends Component {
//   render() {
//     return (
//       <MouseTracker>
//         {(props) => (
//           <>
//             <h3>在红色框内移动鼠标</h3>
//             <p>
//               鼠标当前位置 x={props.x} y={props.y}
//             </p>
//           </>
//         )}
//       </MouseTracker>
//     );
//   }
// }

class MyMouseTracker extends Component {
  render() {
    return (
      <MouseTracker render={
        (props) => (
          <>
            <h3>在红色框内移动鼠标</h3>
            <p>
              鼠标当前位置 x={props.x} y={props.y}
            </p>
          </>
        )
      }/>
    );
  }
}

export default MyMouseTracker;
