## Context

Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。

## API

### React.createContext

为当前的 theme 创建一个 context（“light”为默认值）。只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。

``` js
const ThemeContext = React.createContext('light');
```

### Context. Provider

``` js
< ThemeContext.Provider value = {
        value
    } >
    <
    div style = {
        style
    } >
    <
    Header / >
    <
    Main / >
    <
    /div>  <
    /ThemeContext.Provider>
```

### Class.contextType

``` js
class MyClass extends React.Component {
    componentDidMount() {
        let value = this.context;
        /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
    }
    componentDidUpdate() {
        let value = this.context;
        /* ... */
    }
    componentWillUnmount() {
        let value = this.context;
        /* ... */
    }
    render() {
        let value = this.context;
        /* 基于 MyContext 组件的值进行渲染 */
    }
}
MyClass.contextType = ThemeContext;
```

### Context. Consumer

函数组件时， 用Context. ConsumerAPI

``` js
function Header() {
    return ( <
        ThemeContext.Consumer > {
            (value) => ( <
                div className = "context"
                style = {
                    {
                        border: `3px solid ${value.color}`
                    }
                } >
                <
                p > Header < /p>  <
                Title / >
                <
                /div>
            )
        } <
        /ThemeContext.Consumer>
    );
}
```

## Hooks Context

``` js
import React, {
    useContext
} from 'react';
import RouterContext from './RouterContext.js';

export default function Switch(props) {
    let routerContext = useContext(RouterContext);
    return null;
}
```
