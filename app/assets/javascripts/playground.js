//= require scroll
$(function(){
  mapTest();
  myModule();
  showEverywhere("I love JS!!");
  console.log(player.weapons);
  mybouncingSquare();
  eventProp();
})
//-------------------
// event bubbling
//-------------------

var eventProp = function (){

  var divElements = document.getElementsByClassName('no-bubble-style-divs')
  console.log(divElements)

  for(var i=0; i < divElements.length; i++){
    divElements[i].onclick = function(evt){
      evt = evt || window.evt; //ie8 get the evt object

      if(evt.stopPropagation){ // if this is supported use this ie9 other browsers
        evt.stopPropagation();
      }
      else {
        evt.cancelBubble = true // else use this one
      }
      this.style.borderColor = "red";
      // alert(this.getAttribute("id") + " border color changed")
      alert( " border color changed")

    }
  }
};

//-------------------
// map function
//-------------------

var mapTest = function(){

  var myArray = [4,3,5,2,1]

  var newArray= myArray.map(function(num){
    return num * 2;
  })

  console.log(myArray)
  console.log(newArray)
}

//-------------------
// handlebar example
//-------------------


var handleTest = function (){

  var source= $("#new_template").html();
  var template = Handlebars.compile(source);

  var context = {
    title: "this is our title from far away",
    body: "this is our body"
  };

  var el_html = template(context);
  $("#handle-bars-render-div").html(el_html);
 };

setTimeout(handleTest,3000)


//-------------------
// classic module patern example
//-------------------

var myModule = function () {

  var foo = (function(){

    var o = { bar: "bar"};

    return {
      bar: function(){
        console.log(o.bar);
      }
    };
  })();
  foo.bar();
};

// one outer wrapping function
// two functions have to be return that have a closure over private scope
// access the internal state and that is called a module

//---------------------------
//  Nested Function
//---------------------------

function showEverywhere(text){

  function decorate(a){
    return "88888 " + a + " 88888";
  };

  var text = decorate(text);
  console.log(text);
};



//---------------------------
//  Add methods to objects
//---------------------------

var player = {
  name: "ikigai",
  weapons: ["patience", "knowledge"],
  addWeapon: function(newWeapon){
    this.weapons.push(newWeapon);
  }
};

player.addWeapon("samurai sword")


//---------------------------
//  Canvas
//---------------------------
var mybouncingSquare = function() {
  // initial position
  var x = 10;
  var y = 10;
  // rectangle dimension
  var w = 20;
  var h = 30;
  // speed of our rect
  var speed = 2;
  var speedY = 1;
  var blueZone, orangeZone

  var canvas = document.getElementById("canvasOne");
  var ctx = canvas.getContext("2d");

  var update = function() {
    var crossedRightLimit = x >= 180;
    var crossedLeftLimit = x <= 10;
    var crossedBottomLimit = y >= 170;
    var crossedUpperLimit = y <= 10;

    if(crossedRightLimit){
      x = 170;
      speed = -speed;
    }

    else if(crossedLeftLimit) {
      x = 10;
      speed = -speed;
    }

    if(crossedBottomLimit){
      y = 170;
      speedY = -speedY;
    }

    else if(crossedUpperLimit) {
      y = 10;
      speedY = -speedY;
    }

    y += speedY;
    x += speed;

    blueZone = x > 0 && x < 65;
    orangeZone = !blueZone && x < 130;
  }

  var draw = function(){
    ctx.clearRect(0,0, 200, 200)

    if(blueZone){
      ctx.fillStyle = "#3333FF"
    }
    else if(orangeZone) {
      ctx.fillStyle = "orange"
    }
    else {
      ctx.fillStyle = "rgb(200,0,100)"
    }

    ctx.fillRect(x,y,w,h)
  }

  var step = function (){
    update();
    draw();
    window.requestAnimationFrame(step);
  }

  step();
}

//---------------------------
//  Simple unit test
//---------------------------
// var Bob = require('./bob.js');
// describe("Bob", function() {
//   var bob = new Bob();
//   it("stating something", function() {
//     var result = bob.hey('Tom-ay-to, tom-aaaah-to.');
//     expect(result).toEqual('Whatever.');
//   });
// });


var AjaxWrapper = (function() {
  var request = function(){
    var url = "http://www.reddit.com/r/fiddlercrabs.json";
    var xhr = new XMLHttpRequest();
    xhr.open("get",url,true);

    var myPromise = new Promise(function(resolve,reject){
      xhr.onload = function (e) {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200) {
            resolve(xhr.responseText)
          } else {
            console.error(xhr.statusText);
          }
        }
      };
      xhr.onerror = function (e) {
        reject(xhr.statusText);
      };
      xhr.send();
    });

    myPromise.then(function(value){
      console.log(value);
      console.log("success!!!!")
    });
  };
  return {
    request:request,
  };
})();


var Dom = (function (){

  var select = sweetSelector.select;

  var hide = function (stringElemSelector){
    var divToHide = select(stringElemSelector);
    for (let i = 0; i < divToHide.length; i++){
      divToHide[i].style.display = "none";
    }
  };

  var show = function (stringElemSelector){
    var divToShow = select(stringElemSelector);
    for (let i = 0; i < divToShow.length; i++){
      divToShow[i].style.display = "block";
    }
  };

  var addClass = function (stringElemSelector, newClassName){
    var elementsToAddClass = select(stringElemSelector);
    for (let i = 0; i < elementsToAddClass.length; i++){
      if(elementsToAddClass[i]) {
        elementsToAddClass[i].className += elementsToAddClass[i].className ? " " + newClassName : newClassName;
      }
    }
  };

  var removeClass = function (stringElemSelector, classNameToRemove){
    var elementsToRemoveClass = select(stringElemSelector);
    for (let i = 0; i < elementsToRemoveClass.length; i++){
      elementsToRemoveClass[i].classList.remove(classNameToRemove);
    }
  };

  return {
    hide:hide,
    show:show,
    addClass:addClass,
    removeClass:removeClass
  };

})();

// notes on iife

// (function(global){

//   //private

//   //public
//   global.foo = foo;
//   global.bar = bar; // this will make bar global

// })(window);

// notes on doc ready
// ajax calls do not need to be on doc ready dont use it unless you need it


//bubble sort
var mySorting = function bubbleSort(array){
  var arrayLength = array.length;
  var i = 0;

  for (i;i<arrayLength;i++) {
    var n = 0;
    for (n; n<arrayLength -1; n++) {
      if (array[n+1] < array[n]) {
        var switchedNumber = array[n];
        array[n] = array[n+1];
        array[n+1] = switchedNumber;
      };
    };
  }
  return array;
}

var myArray = [1,3,5,2,4,3,6,8,10,9,7]
console.log(mySorting(myArray))