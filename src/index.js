import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import d3 from 'd3';
//import App from './components/bundle';
// Render the main component into the dom
ReactDOM.render(<App />, document.getElementById('app'));
// Use babel transform so the examples work on the browser
d3.xhr("./components/AreaChart.jsx", "text/plain")
  .get(function(err, data) {
    var outputEl = document.getElementById('chart');
    try {
      var output = Babel.transform(data.responseText, { presets: ["es2015", "react", "stage-2"] }).code;
      eval(output);
    } catch (ex) {
      outputEl.innerHTML = 'ERROR: ' + ex.message;
    }
  })
