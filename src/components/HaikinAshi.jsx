"use strict";
var rs = ReStock.default;
var { ChartCanvas, Chart, EventCapture } = rs;
var { CandlestickSeries, BarSeries, LineSeries, AreaSeries } = rs.series;
var { financeEODDiscontiniousScale } = rs.scale;

var { MouseCoordinates, CurrentCoordinate } = rs.coordinates;
var { EdgeIndicator } = rs.coordinates;

var { TooltipContainer, OHLCTooltip, MovingAverageTooltip } = rs.tooltip;
var { XAxis, YAxis } = rs.axes;
var { ema, sma, haikinAshi } = rs.indicator;
var { fitWidth, TypeChooser } = rs.helper;


var xScale = financeEODDiscontiniousScale();

class HaikinAshi extends React.Component {
  render() {
    var { data, type, width } = this.props;

    var ha = haikinAshi();
    var ema20 = ema()
      .id(0)
      .windowSize(20)
      .merge((d, c) => {d.ema20 = c})
      .accessor(d => d.ema20);

    var ema50 = ema()
      .id(2)
      .windowSize(50)
      .merge((d, c) => {d.ema50 = c})
      .accessor(d => d.ema50);

    var smaVolume50 = sma()
      .id(3)
      .windowSize(50)
      .source(d => d.volume)
      .merge((d, c) => {d.smaVolume50 = c})
      .accessor(d => d.smaVolume50);

    return (
      <ChartCanvas width={width} height={200}
                   margin={{left: 80, right: 80, top:10, bottom: 30}} type={type}
                   seriesName="MSFT"
                   data={data} calculator={[ha, ema20, ema50, smaVolume50]}
                   xAccessor={d => d.date} discontinous xScale={xScale}
                   xExtents={[new Date(2012, 0, 1), new Date(2012, 6, 2)]}>
        <Chart id={1}
               yExtents={[ha.accessor(), ema20.accessor(), ema50.accessor()]}
               yMousePointerDisplayLocation="right" yMousePointerDisplayFormat={d3.format(".2f")}
               padding={{ top: 10, bottom: 20 }}>
          <XAxis axisAt="bottom" orient="bottom"/>
          <YAxis axisAt="right" orient="right" ticks={5} />

          <CandlestickSeries yAccessor={ha.accessor()}/>
          <LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()}/>
          <LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()}/>

          <CurrentCoordinate id={1} yAccessor={ema20.accessor()} fill={ema20.stroke()} />
          <CurrentCoordinate id={2} yAccessor={ema50.accessor()} fill={ema50.stroke()} />

          <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                         yAccessor={ema20.accessor()} fill={ema20.fill()}/>
          <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                         yAccessor={ema50.accessor()} fill={ema50.fill()}/>
          <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                         yAccessor={d => d.close} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"}/>
          <EdgeIndicator itemType="first" orient="left" edgeAt="left"
                         yAccessor={ema20.accessor()} fill={ema20.fill()}/>
          <EdgeIndicator itemType="first" orient="left" edgeAt="left"
                         yAccessor={ema50.accessor()} fill={ema50.fill()}/>
          <EdgeIndicator itemType="first" orient="left" edgeAt="left"
                         yAccessor={d => d.close} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"}/>
        </Chart>
        <Chart id={2}
               yExtents={[d => d.volume, smaVolume50.accessor()]}
               yMousePointerDisplayLocation="left" yMousePointerDisplayFormat={d3.format(".4s")}
               height={50} origin={(w, h) => [0, h - 50]}>
          <YAxis axisAt="left" orient="left" ticks={5} tickFormat={d3.format("s")}/>

          <BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"} />
          <AreaSeries yAccessor={smaVolume50.accessor()} stroke={smaVolume50.stroke()} fill={smaVolume50.fill()}/>

          <CurrentCoordinate id={0} yAccessor={smaVolume50.accessor()} fill={smaVolume50.stroke()} />
          <CurrentCoordinate id={1} yAccessor={d => d.volume} fill="#9B0A47" />

          <EdgeIndicator itemType="first" orient="left" edgeAt="left"
                         yAccessor={d => d.volume} displayFormat={d3.format(".4s")} fill="#0F0F0F"/>
          <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                         yAccessor={d => d.volume} displayFormat={d3.format(".4s")} fill="#0F0F0F"/>
          <EdgeIndicator itemType="first" orient="left" edgeAt="left"
                         yAccessor={smaVolume50.accessor()} displayFormat={d3.format(".4s")} fill={smaVolume50.fill()}/>
          <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                         yAccessor={smaVolume50.accessor()} displayFormat={d3.format(".4s")} fill={smaVolume50.fill()}/>
        </Chart>
        <MouseCoordinates xDisplayFormat={d3.time.format("%Y-%m-%d")} />
        <EventCapture mouseMove={true} zoom={true} pan={true} />
        <TooltipContainer>
          <OHLCTooltip forChart={1} origin={[-40, 0]}/>
          <MovingAverageTooltip forChart={1} onClick={(e) => console.log(e)} origin={[-38, 15]}
                                calculators={[ema20, ema50]}/>
        </TooltipContainer>
      </ChartCanvas>
    );
  }
}

HaikinAshi.propTypes = {
  data: React.PropTypes.array.isRequired,
  width: React.PropTypes.number.isRequired,
  type: React.PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

HaikinAshi.defaultProps = {
  type: "svg",
};

HaikinAshi = fitWidth(HaikinAshi);


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
  ReactDOM.render(<TypeChooser type="hybrid">{type => <HaikinAshi data={data} type={type} />}</TypeChooser>, document.getElementById("chart"));
});
