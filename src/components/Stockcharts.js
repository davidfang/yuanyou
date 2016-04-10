{/**
 * Created by david_fang on 2016/4/4.
 */}
"use strict";
{/**import d3 from 'd3';**/}
//import rs from 'react-stockcharts';
import React from 'react';
import ReactDOM from 'react-dom';
var rs = require('react-stockcharts');
//var rs = ReStock.default;
//console.log(ReStock);
console.log(rs);
//var rs = ReStock.default;
var { ChartCanvas, Chart, EventCapture } = rs;

var { GroupedBarSeries  } = rs.series;

var { XAxis, YAxis } = rs.axes;
var { fitWidth, TypeChooser } = rs.helper;

class Stockcharts extends React.Component {
  render() {
    var { data, type, width } = this.props;

    var f = d3.scale.category10()
      .domain(d3.set(data.map(d => d.region)));

    var fill = (d, i) => f(i);
    return (
      <ChartCanvas width={width} height={400}
                   margin={{left: 40, right: 10, top:20, bottom: 30}} type={type}
                   seriesName="Fruits"
                   xExtents={list => list.map(d => d.x)}
                   data={data}
                   xAccessor={d => d.x} xScale={d3.scale.ordinal()}
                   padding={1}>
        <Chart id={1}
               yExtents={[0, d => [d.y1, d.y2, d.y3, d.y4]]}>
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis axisAt="left" orient="left" />
          <GroupedBarSeries yAccessor={[d => d.y1, d => d.y2, d => d.y3, d => d.y4]}
                            fill={fill}
                            spaceBetweenBar={3}/>
        </Chart>
      </ChartCanvas>
    );
  }
}

Stockcharts.propTypes = {
  data: React.PropTypes.array.isRequired,
  width: React.PropTypes.number.isRequired,
  type: React.PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

Stockcharts.defaultProps = {
  type: "svg",
};
Stockcharts = fitWidth(Stockcharts);


d3["json"]("//rrag.github.io/react-stockcharts/data/groupedBarData.json", (err, data) => {
  ReactDOM.render(<TypeChooser type="hybrid">{type => <Stockcharts data={data} type={type} />}</TypeChooser>, document.getElementById("chart"));
});
