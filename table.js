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

  function Table (title, data, container, include_title, include_headers) {

    this.title = title;
    this.container = container;
    this.data = data
	
    console.log(this.title);
    console.log(this.data);
    
    var bootstrapRow = document.createElement('div');
    bootstrapRow.setAttribute('class', 'row')
    var bootstrapCol = document.createElement('div');
    bootstrapCol.setAttribute('class', 'col-md-8');

    if (include_title) {
      var titleElement = document.createElement('h3');
      titleElement.appendChild(document.createTextNode(title));
      bootstrapCol.appendChild(titleElement);
    }

    var table = document.createElement('table');

    if (include_headers) {
      var header = document.createElement('tr');
      for (var headerText in this.data[0]) {
        var headerCell = document.createElement('th');
        headerCell.appendChild(document.createTextNode(headerText));
        header.appendChild(headerCell);
      }
      table.appendChild(header);
    }

    this.data.forEach( function(rowData, i) {
      var row = document.createElement('tr');

      for (var attribute in rowData) {
        var cell = document.createElement('td');
        cell.appendChild(
          document.createTextNode(
            rowData[attribute]
          ));
        row.appendChild(cell);
      }

      table.appendChild(row);

    });

    bootstrapCol.appendChild(table);
    bootstrapRow.appendChild(bootstrapCol);
    this.element = bootstrapRow;

  }

  Table.prototype.create = function (position) {
    this.container.insertBefore(
      this.element,
      this.container.children[position]
    );
  };


  /* Constructor */

  function createTable (title, data, containerId, position, include_title, include_headers) {
    var container = document.getElementById(containerId);
    var table = new Table(title, data, container, include_title, include_headers);
    table.create(position);
  }


  /* Helper Functions */

  function getQueryResultsByName (name) {
    return datasets.filter( function(d) {
      return d.queryName == name;
    })[0].content;
  }


  /* Interface */

  exports.generate = function (queries, position, include_title, include_headers) {

    queries.forEach( function (query, i) {

      var results = getQueryResultsByName(query);
      var container = "container";
      var currentPosition  = position + i;

      createTable(
        query,
        results,
        container,
        currentPosition,
        include_title,
        include_headers
      );

    });

  };

} ) ( this.table = {} );
