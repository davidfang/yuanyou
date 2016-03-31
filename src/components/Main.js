require('normalize.css');
require('styles/App.css');

import React from 'react';
import Hello from './Hello';
let yeomanImage = require('../images/yeoman.png');
class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <Hello username = {this.props.username}/>
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
  username:'张三'
};

export default AppComponent;
