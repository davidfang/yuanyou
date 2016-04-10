{/**
 * Created by david_fang on 2016/4/4.
 */}
import React from 'react';
//import d3 from 'd3';
//import d3 from 'd3';
var d3 = require('d3');
import StockCharts from './Stockcharts';
export default class Dd3 extends React.Component{
  render(){
     d3.xhr(StockCharts,"text/plain")
      .get(function(err, data) {
        var outputEl = document.getElementById('chart');
        try {
          var output = Babel.transform(data.responseText, { presets: ["es2015", "react", "stage-2"] }).code;
          eval(output);
        } catch (ex) {
          outputEl.innerHTML = 'ERROR: ' + ex.message;
        }
      })
    return <div><div id="chart"></div></div>
  }
}
