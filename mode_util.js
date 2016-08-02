( function (exports) {

  exports.getQueryResultsByName = function (name) {
    return datasets.filter(function(d) {
      return d.queryName == name;
    })[0].content;
  };

  exports.sumDataColumn = function (data, columnName) {
    return data
      .map(function(d) {
        return d[columnName];
      })
      .reduce(function(acc, curr) {
        return acc + curr;
      });
  };

} ) ( this.mode_utils = {} );
