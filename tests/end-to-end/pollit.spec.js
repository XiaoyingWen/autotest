"use strict";
const Nightmare = require( "nightmare" ),
expect = require( "chai" ).expect,
BASE_URL = "https://obscure-crag-43344.herokuapp.com/home",
onError = ( err ) => {
        console.error( "Test-runner failed:", err );
},
browser = new Nightmare({
    openDevTools: {
    mode: "detach"
  },
        show: true,
        typeInterval: 300,
        pollInterval: 300
});

describe( "TODO", function(){
  this.timeout( 30000 );
  // start up with the blank list
// insert here the tests

it( "should prompt login", ( done ) => {
  const NEWTODO_INPUT = 'input[name="username"]';
  const NEWTODO_INPUT2 = "input[name='password'";
  browser
    .goto( BASE_URL )   //wait .new-todo element to get available in the DOM
    .wait( NEWTODO_INPUT )
    // type "watch GoT" in the input box and press ENTER
    .type( NEWTODO_INPUT, "xiaoyingwen" )
    .type( NEWTODO_INPUT2, "abc123" )
    .click('button[type="submit"]')
    // wait until the list receives the item
    .wait( "#charDisplaySection" )
    //the Nightmare will poll every 50ms (as specified in pollInterval option)
    // until the condition is met. When the list is rendered 

    // get the number of available items
    .evaluate(() => { //evaluate JavaScript querying for list items 
      //and assert that only 1 item was added
      return document.querySelectorAll( ".dynamicChart" ).length;
    })
    .then(( res ) => {
      expect( res ).to.eql( 1 );
      done();
    }).catch( onError );
});

});