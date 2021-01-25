import React from 'react';
import ReactDOM from 'react-dom';

import RefComponent from './Ref';
import LifeCycle from './LifeCycle';
import Context from './Context';
import Render from './Render';

class App extends React.Component {
  render() {
    return (
      <>
        <Render />
        <Context />
        <LifeCycle />
        <RefComponent />
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
