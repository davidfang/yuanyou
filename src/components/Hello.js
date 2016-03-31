import React from 'react';
import RaactBootstrap from 'react-bootstrap';


export default class Hello extends React.Component {
  render() {
    return <h1>Hello world <code>{this.props.username}</code></h1>;
  }
}
