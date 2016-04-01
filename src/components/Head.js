import React from 'react';
import {Button,Navbar,Nav,NavItem,NavDropdown,MenuItem,PageHeader,Col,Thumbnail,Image} from 'react-bootstrap';
let yeomanImage = require('../images/yeoman.png');
let data = {name:'张三丰',thumbnails:yeomanImage,account:5000};
export default class Head extends React.Component{
  render(){
    return <div className=" bg-primary">
          <Image src={data.thumbnails} circle width="30 px" />
          <small>{data.name} 资金：{data.account}元</small>
          <Button className="btn btn-success btn-xs  pull-right ">充值</Button>
      </div>;
  }
}
