{/**
 * Created by david_fang on 2016/4/1.
 */}
import React from 'react';

export default class Notice extends React.Component{
  render(){
    return <div className="notice">
      <p ><small>{this.props.notice.msg}</small></p>
    </div>
  }
}
