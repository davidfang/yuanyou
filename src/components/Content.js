{/**
 * Created by david_fang on 2016/4/1.
 */}
import React from 'react';
import Product from './Product';

export default class Content extends React.Component{
  render(){
    let rows = [];
    this.props.products.forEach(function(product) {
      if(product.up){
        rows.push( <div key={product.type} className="col-xs-6 col-sm-6 col-md-4 btn-danger center-block " >
          <h4>{product.name} {product.price}
          <span className='glyphicon glyphicon-chevron-up brand-danger btn-default' style={{color:'darkred'}}  aria-hidden="true"></span>
          </h4>
        </div>);
      }else {
        rows.push( <div key={product.type} className="col-xs-6 col-sm-6 col-md-4 btn-success center-block ">
          <h4>
          {product.name} {product.price}
          <span className='glyphicon glyphicon-chevron-down brand-success btn-default' style={{color:'green'}}   aria-hidden="true"></span>
          </h4>
        </div>);
      };
    })

    return <div  className="row  center-block">
      {rows}
      <div>
        {
          this.props.products.map(function (product) {
            return <div key={product.name}>
              <h4>{product.name}</h4>
              <Product product={product} />
            </div>;
          })
        }
      </div>
    </div>
  }
}
