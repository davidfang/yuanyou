import React from 'react';
import {ButtonToolbar,Button} from 'react-bootstrap';


export default class Hello extends React.Component {
  render() {
    return <div>
        <h1>Hello world <code>{this.props.username}</code></h1>
        <div className="well" >
          <Button type="button" bsStyle="primary" bsSize="large" block>Block level button</Button>
          <Button type="button" bsSize="large" block>Block level button</Button>
        </div>
      </div>;
  }
}
