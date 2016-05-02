"use strict";
var rs = ReStock.default;
var { ChartCanvas, Chart } = rs;
var { CandlestickSeries, BarSeries } = rs.series;
var { financeEODDiscontiniousScale } = rs.scale;

var { XAxis, YAxis } = rs.axes;

var { fitWidth, TypeChooser } = rs.helper;

class CandleStickStockScaleChartWithVolumeBarV3 extends React.Component {
  render() {
    var { data, type, width } = this.props;

    return (
      <ChartCanvas width={width} height={300}
                   margin={{left: 50, right: 50, top:10, bottom: 30}} type={type}
                   seriesName="MSFT"
                   data={data}
                   xAccessor={d => d.date} discontinous xScale={financeEODDiscontiniousScale()}
                   xExtents={[new Date(2012, 0, 1), new Date(2012, 6, 2)]}>
        <Chart id={1} height={200} yExtents={d => [d.high, d.low]} >
          <YAxis axisAt="right" orient="right" ticks={5} />
          <XAxis axisAt="bottom" orient="bottom" showTicks={false}/>
          <CandlestickSeries />
        </Chart>
        <Chart id={2} origin={(w, h) => [0, h - 100]} height={100} yExtents={d => d.volume}>
          <XAxis axisAt="bottom" orient="bottom"/>
          <YAxis axisAt="left" orient="left" ticks={5} tickFormat={d3.format("s")}/>
          <BarSeries yAccessor={d => d.volume} fill={(d) => d.close > d.open ? "#6BA583" : "red"} />
        </Chart>
      </ChartCanvas>
    );
  }
}
CandleStickStockScaleChartWithVolumeBarV3.propTypes = {
  data: React.PropTypes.array.isRequired,
  width: React.PropTypes.number.isRequired,
  type: React.PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickStockScaleChartWithVolumeBarV3.defaultProps = {
  type: "svg",
};
CandleStickStockScaleChartWithVolumeBarV3 = fitWidth(CandleStickStockScaleChartWithVolumeBarV3);


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
    // console.log(d);
  });
  /* change the type from hybrid to svg to compare the performance between svg and canvas */
  ReactDOM.render(<TypeChooser type="hybrid">{type => <CandleStickStockScaleChartWithVolumeBarV3 data={data} type={type} />}</TypeChooser>, document.getElementById("chart"));
});
