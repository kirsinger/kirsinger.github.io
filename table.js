/*
  Metrics Visualisation for Mode Analytics

  Author: Kai Hirsinger (kai@edrolo.com)
  Since:  2nd August 2016

  Performs some simple metric visualisation using the results
  of queries run in Mode Analytics.

  Usage:
  1) Import script via <script> tag in Mode report.
  2) Create a new div element with the id "metrics-container".
  3) Define a new <script> element at the end of the report that
     declares the variable "metricQueries". This variable is an
     array that stores the names of each query containing metrics
     that should be rendered by the script.
*/

( function (exports) {

  /* Objects */

  function Table (title, data, container) {
    this.title     = title;
    this.container = container;
  }


  /* Constructor */

  function createTable (title, data, containerId, position) {
    var container = document.getElementById(containerId);
    var metrics   = new Table(title, data, container);
    metrics.create(position);
  }


  /* Helper Functions */

  function getQueryResultsByName (name) {
    return datasets.filter( function(d) {
      return d.queryName == name;
    })[0].content;
  }

  /* Interface */

  exports.generate = function (queries, position) {

    queries.forEach( function (query, i) {

      var results = getQueryResultsByName(query);
      var container = "container";
      var currentPosition  = position + i;

      console.log(results);
      console.log(container);
      console.log(currentPosition);

      /*
      createTable(
        query,
        results[0],
        container,
        currentPosition
      );
      */

    });

  };

} ) ( this.metrics = {} );
