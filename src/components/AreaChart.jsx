"use strict";
var rs = ReStock.default;
var {ChartCanvas, Chart} = rs;

var {AreaSeries} = rs.series;
var {XAxis, YAxis} = rs.axes;
var {fitWidth, TypeChooser} = rs.helper;

class AreaChart extends React.Component {
  render() {
    var {data, type, width} = this.props;
    return (
      <ChartCanvas width={width} height={300}
                   margin={{left: 50, right: 50, top:10, bottom: 80}}
                   seriesName="MSFT"
                   data={data} type={type}
                   xAccessor={d => d.date} xScale={d3.time.scale()}
                   xExtents={[new Date(2011, 0, 1), new Date(2013, 0, 2)]}>
        <Chart id={0} yExtents={d => d.close}>
          <XAxis axisAt="bottom" orient="bottom" ticks={6}/>
          <YAxis axisAt="left" orient="left" />
          <YAxis axisAt="right" orient="right" percentScale={true} tickFormat={d3.format(".0%")}/>
          <AreaSeries yAccessor={(d) => d.close}/>

        </Chart>
      </ChartCanvas>
    );
  }
}

/*

 */

AreaChart.propTypes = {
  data: React.PropTypes.array.isRequired,
  width: React.PropTypes.number.isRequired,
  type: React.PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

AreaChart.defaultProps = {
  type: "svg",
};
AreaChart = fitWidth(AreaChart);


var parseDate = d3.time.format("%Y-%m-%d").parse;
d3.tsv("//rrag.github.io/react-stockcharts/data/MSFT.tsv", (err, data) => {
  /* change MSFT.tsv to MSFT_full.tsv above to see how this works with lots of data points */
  data.forEach((d, i) => {
    d.date = new Date(parseDate(d.date).getTime());
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;
    //console.log(d);
  });
  /* change the type from hybrid to svg to compare the performance between svg and canvas */
  ReactDOM.render(<TypeChooser type="hybrid">{type => <AreaChart data={data}
                                                                 type={type}/>}</TypeChooser>, document.getElementById("chart"));
});
