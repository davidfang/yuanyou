import React from 'react';
import {Button,Navbar,Nav,NavItem,NavDropdown,MenuItem,PageHeader,Col,Thumbnail,Image} from 'react-bootstrap';
export default class Head extends React.Component{
  render(){
    return <header className=" bg-primary">
            <Image src={this.props.userInfo.thumbnails} circle width="30 px" />
            <small>{this.props.userInfo.name} 资金：{this.props.userInfo.account}元</small>
            <Button className="btn btn-success bg-success btn-xs  pull-right "><small>充值</small></Button>
          </header>;
  }
}
