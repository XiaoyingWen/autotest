"use strict";
const Nightmare = require( "nightmare" ),
expect = require( "chai" ).expect,
BASE_URL = "http://todomvc.com/examples/backbone/",
onError = ( err ) => {
        console.error( "Test-runner failed:", err );
},
browser = new Nightmare({
    openDevTools: {
    mode: "detach"
  },
        show: true,
        typeInterval: 500,
        pollInterval: 500
});

describe( "TODO", function(){
  this.timeout( 15000 );
  // start up with the blank list
  before(( done ) => {
    browser
        .goto( BASE_URL )
        .evaluate(() => {
          return localStorage.clear();
        })
        .then(() => {
          done();
        });
  });
  // disconnect and close Electron process
  after(() => {
    browser
      .end();
  });
// insert here the tests

it( "should add an item to the list", ( done ) => {
  const NEWTODO_INPUT = ".new-todo";
  browser
    .refresh()    //wait .new-todo element to get available in the DOM
    .wait( NEWTODO_INPUT )
    // type "watch GoT" in the input box and press ENTER
    .type( NEWTODO_INPUT, "watch GoT" )
    .type( NEWTODO_INPUT, '\u000d')
    // wait until the list receives the item
    .wait( ".todo-list li" )
    //the Nightmare will poll every 50ms (as specified in pollInterval option)
    // until the condition is met. When the list is rendered 

    // get the number of available items
    .evaluate(() => { //evaluate JavaScript querying for list items 
      //and assert that only 1 item was added
      return document.querySelectorAll( ".todo-list li" ).length;
    })
    .then(( res ) => {
      expect( res ).to.eql( 1 );
      done();
    }).catch( onError );
});

it( "should remove an item from the list", ( done ) => {
  const REMOVE_BTN = "button.destroy";
  browser
    // click of the first item fo the list
    .click( ".todo-list li:first-child " + REMOVE_BTN )
    // wait until the list is hidden (happens when it gets empty)
    .wait(() => {
      return document.querySelector( ".main" ).style.display === "none";
    })
    .evaluate(() => {
      return document.querySelectorAll( ".todo-list li" ).length;
    })
    .then(( res ) => {
      expect( res ).to.eql( 0 );
      done();
    }).catch( onError );
});

});