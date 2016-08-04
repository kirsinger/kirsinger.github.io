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

  function MetricGroup (title, metrics, container, labelled) {
    this.title     = title;
    this.container = container;
    this.metrics   = [];
    for (var label in metrics) {
      if (labelled) {
        var metric = this._createMetric(metrics[label], label);
      } else {
        var metric = this._createMetric(metrics[label])
      }
      this.metrics.push(metric);
    }

    var row = document.createElement("div");
    row.setAttribute("class", "row");

    var header = document.createElement("div");
    header.settAttribute("class", "mode-header");
    var headerText = document.createElement("h3");
    headerText.appendChild(document.createTextNode(this.title));
    header.appendChild(headerText)
    row.appendChild(header);

    this.metrics.forEach( function(element) {
      row.appendChild(element);
    });

    this.element = row;
  }

  MetricGroup.prototype._createMetric = function(value, label) {
    var metricElement = document.createElement("div");
    metricElement.setAttribute("class", "col-md-4");

    if (label) {
      var header = document.createElement("p");
      var headerText = label.replace(/_/g, " "); // Replaces underscores with single space
      header.appendChild(document.createTextNode(headerText));
      metricElement.appendChild(header);
    }

    var content = document.createElement("p");
    var contentValue = numberWithSpaces(value);
    content.appendChild(document.createTextNode(contentValue));
    metricElement.appendChild(content);

    return metricElement;
  }

  MetricGroup.prototype.create = function(position) {
    this.container.insertBefore(
      this.element,
      this.container.children[position]
    );
  }


  /* Helper Functions */

  function numberWithSpaces(number) {
    return number
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  function getQueryResultsByName (name) {
    return datasets.filter(function(d) {
      return d.queryName == name;
    })[0].content;
  }

  function sumDataColumn (data, columnName) {
    return data
      .map(function(d) {
        return d[columnName];
      })
      .reduce(function(accumulated, current) {
        return accumulated + current;
      });
  }

  function createMetricGroup (title, data, containerId, position, labelled) {
    var container = document.getElementById(containerId);
    var metrics   = new MetricGroup(title, data, container, labelled);
    metrics.create(position);
  }


  /* Interface */

  exports.generate = function (metricQueries, position) {
    metricQueries.forEach( function (query, i) {
      var results = getQueryResultsByName(query);
      var container = "container";
      var currentPosition  = position + i;
      createMetricGroup(
        query,
        results[0],
        container,
        currentPosition,
        true
      );
    });
  };

} ) ( this.metrics = {} );
