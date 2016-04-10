//require('normalize.css');
//require('styles/App.css');

import React from 'react';
//import ReactDOM from 'react-dom';
import Head from './Head';
import Notice from './Notice';
import Content from './Content';
//import Dd3 from './Dd3';
let yeomanImage = require('../images/yeoman.png');
let userInfo = {name:'张三丰',thumbnails:yeomanImage,account:5000};
let notice = {msg:'暂无消息',length:5,data:{}};
let products = [
  {name:'白银',type:'silver',price:3100,up:false,
    format:[
      {size:'500g',price:30,changeUnit:0.5},
      {size:'4kg',price:300,changeUnit:4},
      {size:'7.5kg',price:500,changeUnit:7.5}
    ]
  },
  {name:'原油',type:'crude',price:213.05,up:true,
    format:[
      {size:'500g',price:30,changeUnit:0.5},
      {size:'4kg',price:300,changeUnit:4},
      {size:'7.5kg',price:500,changeUnit:7.5}
    ]
  }
];
class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <Head userInfo={userInfo}/>
        <Notice notice={notice} />
        <Content products ={products} />

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
