{/**
 * Created by david_fang on 2016/4/3.
 */}
import React from 'react';

export default class Product extends React.Component{
  render(){
    var product = this.props.product;
    var content = this.props.product.format.map(function (format) {
                      return <div key={format.size} className="btn-group-vertical col-xs-4 col-sm-4 col-md-4 text-center">
                        <div className="btn btn-danger" >买涨</div>
                        <div className="btn btn-default">
                          <small><p>{product.name} {format.size}<br/>
                          <strong className="">{format.price}元/手</strong><br/>
                          波动盈浮：{format.changeUnit}元</p></small>
                        </div>
                        <div className="btn btn-success" >买跌</div>
                      </div>
                  })
    return <div>
      {content}
    </div>
  }
}
