"use strict";

var { ChartCanvas, Chart, DataSeries } = ReStock;
var { CandlestickSeries, HistogramSeries } = ReStock.series;

var { StockscaleTransformer } = ReStock.transforms;
var { XAxis, YAxis } = ReStock.axes;

var { fitWidth, TypeChooser } = ReStock.helper;

class CandleStickStockScaleChartWithVolumeHistogramV3 extends React.Component {
  render() {
    var { data, type, width } = this.props;

    return (
      <ChartCanvas width={width} height={600}
                   margin={{left: 70, right: 70, top:20, bottom: 30}} initialDisplay={100}
                   dataTransform={[ { transform: StockscaleTransformer } ]}
                   data={data} type={type}>

        <Chart id={1} yMousePointerDisplayLocation="right" yMousePointerDisplayFormat={(y) => y.toFixed(2)}
               height={400} >
          <YAxis axisAt="right" orient="right" ticks={5} />
          <XAxis axisAt="bottom" orient="bottom" showTicks={false}/>
          <DataSeries id={0} yAccessor={CandlestickSeries.yAccessor} >
            <CandlestickSeries />
          </DataSeries>
        </Chart>
        <Chart id={2} yMousePointerDisplayLocation="left" yMousePointerDisplayFormat={d3.format(".4s")}
               height={150} origin={(w, h) => [0, h - 150]} >
          <XAxis axisAt="bottom" orient="bottom"/>
          <YAxis axisAt="left" orient="left" ticks={5} tickFormat={d3.format("s")}/>
          <DataSeries id={0} yAccessor={(d) => d.volume} >
            <HistogramSeries fill={(d) => d.close > d.open ? "#6BA583" : "red"} />
          </DataSeries>
        </Chart>
      </ChartCanvas>
    );
  }
}
CandleStickStockScaleChartWithVolumeHistogramV3.propTypes = {
  data: React.PropTypes.array.isRequired,
  width: React.PropTypes.number.isRequired,
  type: React.PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickStockScaleChartWithVolumeHistogramV3.defaultProps = {
  type: "svg",
};
CandleStickStockScaleChartWithVolumeHistogramV3 = fitWidth(CandleStickStockScaleChartWithVolumeHistogramV3);


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
  ReactDOM.render(<TypeChooser type="hybrid">{type => <CandleStickStockScaleChartWithVolumeHistogramV3 data={data} type={type} />}</TypeChooser>, document.getElementById("chart"));
});
