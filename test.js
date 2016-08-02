var my_test = ( function () {

  function test(thing) {
    console.log(thing);
  }

  var tester = new test;

  return tester;
  
} );
