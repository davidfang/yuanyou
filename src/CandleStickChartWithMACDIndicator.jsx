"use strict";
var rs = ReStock.default;
var { ChartCanvas, Chart, EventCapture } = rs;

var { CandlestickSeries, BarSeries, LineSeries, AreaSeries, MACDSeries } = rs.series;
var { financeEODDiscontiniousScale } = rs.scale;

var { MouseCoordinates, CurrentCoordinate } = rs.coordinates;
var { EdgeIndicator } = rs.coordinates;

var { TooltipContainer, OHLCTooltip, MovingAverageTooltip, MACDTooltip } = rs.tooltip;

var { XAxis, YAxis } = rs.axes;
var { macd, ema, sma } = rs.indicator;

var { fitWidth, TypeChooser } = rs.helper;

var xScale = financeEODDiscontiniousScale();

class CandleStickChartWithMACDIndicator extends React.Component {
  getChartCanvas() {
    return this.refs.chartCanvas;
  }
  render() {
    var { data, type, width } = this.props;

    var ema26 = ema()
      .id(0)
      .windowSize(26)
      .merge((d, c) => {d.ema26 = c})
      .accessor(d => d.ema26);

    var ema12 = ema()
      .id(1)
      .windowSize(12)
      .merge((d, c) => {d.ema12 = c})
      .accessor(d => d.ema12);

    var macdCalculator = macd()
      .fast(12)
      .slow(26)
      .signal(9)
      .merge((d, c) => {d.macd = c})
      .accessor(d => d.macd);

    var smaVolume50 = sma()
      .id(3)
      .windowSize(10)
      .source(d => d.volume)
      .merge((d, c) => {d.smaVolume50 = c})
      .accessor(d => d.smaVolume50);

    return (
      <ChartCanvas ref="chartCanvas" width={width} height={300}
                   margin={{left: 70, right: 70, top:20, bottom: 30}} type={type}
                   seriesName="MSFT"
                   data={data} calculator={[ema26, ema12, smaVolume50, macdCalculator]}
                   xAccessor={d => d.date} discontinous xScale={xScale}>
        <Chart id={1} height={150}
               yExtents={[d => [d.high, d.low], ema26.accessor(), ema12.accessor()]}
               yMousePointerDisplayLocation="right" yMousePointerDisplayFormat={d3.format(".2f")}
               padding={{ top: 10, bottom: 20 }}>
          <XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0} />
          <YAxis axisAt="right" orient="right" ticks={5} />

          <CandlestickSeries />
          <LineSeries yAccessor={ema26.accessor()} stroke={ema26.stroke()}/>
          <LineSeries yAccessor={ema12.accessor()} stroke={ema12.stroke()}/>

          <CurrentCoordinate id={1} yAccessor={ema26.accessor()} fill={ema26.stroke()} />
          <CurrentCoordinate id={2} yAccessor={ema12.accessor()} fill={ema12.stroke()} />

          <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                         yAccessor={d => d.close} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"}/>
        </Chart>
        <Chart id={2} height={50}
               yExtents={[d => d.volume, smaVolume50.accessor()]}
               yMousePointerDisplayLocation="left" yMousePointerDisplayFormat={d3.format(".4s")}
               origin={(w, h) => [0, h - 50]}>
          <YAxis axisAt="left" orient="left" ticks={5} tickFormat={d3.format("s")}/>
          <BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"} />
          <AreaSeries yAccessor={smaVolume50.accessor()} stroke={smaVolume50.stroke()} fill={smaVolume50.fill()}/>
        </Chart>
        <Chart id={3} height={50}
               yExtents={macdCalculator.accessor()}
               yMousePointerDisplayLocation="right" yMousePointerDisplayFormat={d3.format(".2f")}
               origin={(w, h) => [0, h - 50]} padding={{ top: 10, bottom: 10 }} >
          <XAxis axisAt="bottom" orient="bottom"/>
          <YAxis axisAt="right" orient="right" ticks={2} />
          <MACDSeries calculator={macdCalculator} />
        </Chart>
        <MouseCoordinates xDisplayFormat={d3.time.format("%Y-%m-%d")} />
        <EventCapture mouseMove={true} zoom={true} pan={true} />
        <TooltipContainer>
          <OHLCTooltip forChart={1} origin={[-40, 0]}/>
          <MovingAverageTooltip forChart={1} onClick={(e) => console.log(e)} origin={[-38, 15]}
                                calculators={[ema26, ema12]}/>
          <MACDTooltip forChart={3} origin={[-38, 15]} calculator={macdCalculator}/>
        </TooltipContainer>
      </ChartCanvas>
    );
  }
};

CandleStickChartWithMACDIndicator.propTypes = {
  data: React.PropTypes.array.isRequired,
  width: React.PropTypes.number.isRequired,
  type: React.PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChartWithMACDIndicator.defaultProps = {
  type: "svg",
};

CandleStickChartWithMACDIndicator = fitWidth(CandleStickChartWithMACDIndicator);


var parseDate = d3.time.format("%Y-%m-%d").parse;
d3.tsv("//rrag.github.io/react-stockcharts/data/MSFT_full.tsv", (err, data) => {
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
  ReactDOM.render(<TypeChooser type="hybrid">{type => <CandleStickChartWithMACDIndicator data={data} type={type} />}</TypeChooser>, document.getElementById("chart"));
});
