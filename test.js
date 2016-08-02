var my_test = ( function (exports) {

  exports.test = function (thing) {
    console.log(thing);
  };

} ) (this.tester = {} );
