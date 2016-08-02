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

    var header = document.createElement("p");
    header.setAttribute("class", "metric-header");
    header.appendChild(document.createTextNode(this.title));
    row.appendChild(header);

    this.metrics.forEach( function(element) {
      row.appendChild(element);
    });

    this.element = row;
  }

  MetricGroup.prototype._createMetric = function(value, label) {
    var metricElement = document.createElement("div");
    metricElement.setAttribute("class", "metric-container");
    if (label) {
      var header = document.createElement("p");
      var headerText = label.replace(/_/g, " ");
      header.setAttribute("class", "metric-sub-header");
      header.appendChild(document.createTextNode(headerText));
      metricElement.appendChild(header);
    }

    var content = document.createElement("p");
    var contentValue = numberWithSpaces(value);
    content.setAttribute("class", "metric-value");
    content.appendChild(document.createTextNode(contentValue));
    metricElement.appendChild(content);

    return metricElement;
  }

  MetricGroup.prototype.create = function() {
    this.container.appendChild(this.element);
  }


  /* Helper Functions */

  function numberWithSpaces(number) {
    return number
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }


  /* Interface */

  exports.createMetricGroup = function (title, data, containerId, labelled) {
    var container = document.getElementById(containerId);
    var metrics   = new MetricGroup(title, data, container, labelled);
    metrics.create();
  };

} ) ( this.metric_group = {} );
