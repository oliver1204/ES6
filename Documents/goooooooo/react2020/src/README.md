## render props 
我们有个例子：

```js
class MouseTracker extends Component {
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
    let { x, y } = this.state;
    return (
      <div className="box" onMouseMove={this.handleMouseMove}>
        <h3>在红色框内移动鼠标</h3>
        <p>
          鼠标当前位置 x={x} y={y}
        </p>
      </div>
    );
  }
}
```
对于上面的例子，获取鼠标位置复用性很高，但是里面的内容部分却非常灵活，经常改变，对此我们将代码进行调整：

```js
....

render() {
  return (
    <div className="box" onMouseMove={this.handleMouseMove}>
      {this.props.children(this.state)}
    </div>
  );
}
...

class MyMouseTracker extends Component {
  render() {
    return (
      <MouseTracker>
        {(props) => (
          <>
            <h3>在红色框内移动鼠标</h3>
            <p>
              鼠标当前位置 x={props.x} y={props.y}
            </p>
          </>
        )}
      </MouseTracker>
    );
  }
}
```
对于上面的写法我们可以用render的方式俩改写
```js
...
<div className="box" onMouseMove={this.handleMouseMove}>
  {this.props.render(this.state)}
</div>
...

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

```

```js

```