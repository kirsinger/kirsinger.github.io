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

  function Definition (title, data, container) {

    this.title = title;
    this.container = container;
    this.data = data[0];

    var bootstrapRow = document.createElement('div');
    bootstrapRow.setAttribute('class', 'row')
    var bootstrapCol = document.createElement('div');
    bootstrapCol.setAttribute('class', 'col-md-12');

    var definition = document.createElement('dl');

    for (var attribute in this.data) {
      var defTitle = document.createElement('dt');
      defTitle.appendChild(document.createTextNode(attribute));
      definition.appendChild(defTitle);

      var defData  = document.createElement('dd');
      defData.appendChild(document.createTextNode(this.data[attribute]));
      definition.appendChild(defData);
    }

    bootstrapCol.append(definition);
    bootstrapRow.appendChild(bootstrapCol);
    this.element = bootstrapRow;

  }

  Definition.prototype.create = function (position) {
    this.container.insertBefore(
      this.element,
      this.container.children[position]
    );
  };


  /* Constructor */

  function createDefinition (title, data, containerId, position) {
    var container  = document.getElementById(containerId);
    var definition = new Definition(title, data, container);
    definition.create(position);
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

      createDefinition(
        query,
        results,
        container,
        currentPosition
      );

    });

  };

} ) ( this.definition = {} );
