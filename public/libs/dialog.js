/*
    The code below will manage
    the mouseover, onclick, and
    mouseout events.
    */

    // Capture touch capability
    var touchEnabled = false;

    //
    // DIV BUTTON ONE
    //

    // First add the button id found in the html
    var buttonOneTouchTarget = "buttonOneTouchTarget";
    var buttonOne = "buttonOne";

    // Declare function to manage mouse over event.
    var buttonOneOnMouseOver = document.getElementById(buttonOneTouchTarget);
    buttonOneOnMouseOver.onmouseover = function(){
      // console.log("Div button " + buttonOne + " on mouse over");
      document.getElementById(buttonOne).style.backgroundColor = "rgba(99,99,99,0.2)";
    }

    // Declare function to manage mouse down event.
    var buttonOneOnMouseDown = document.getElementById(buttonOneTouchTarget);
    buttonOneOnMouseDown.onmousedown = function(){
      // console.log("Div button " + buttonOne + " on mouse down");
      document.getElementById(buttonOne).style.backgroundColor = "rgba(99,99,99,0.4)";
    }

    // Declare function to manage mouse down event on iOS Safari
    var buttonOneOnTouchStart = document.getElementById(buttonOneTouchTarget);
    buttonOneOnTouchStart.ontouchstart = function(){
      // console.log("Div button " + buttonOne + " on touch start");
      document.getElementById(buttonOne).style.backgroundColor = "rgba(99,99,99,0.4)";
      touchEnabled = true;
    }

    // Declare function to manage mouse up event.
    var buttonOneOnMouseUp = document.getElementById(buttonOneTouchTarget);
    buttonOneOnMouseUp.onmouseup = function(){
      if(touchEnabled === false){
        // console.log("Div button " + buttonOne + " on mouse up" + " A");
        document.getElementById(buttonOne).style.backgroundColor = "rgba(99,99,99,0.2)";
      }else{
        // console.log("Div button " + buttonOne + " on mouse up" + " B");
        document.getElementById(buttonOne).style.backgroundColor = "rgba(99,99,99,0)";
      }
    }

    // Declare function to manage mouse on click event.
    var buttonOneOnClick = document.getElementById(buttonOneTouchTarget);
    buttonOneOnClick.onclick = function(){
      $('#dialog').hide();
      if(touchEnabled === false){
        // console.log("Div button " + buttonOne + " on click" + " A");
        document.getElementById(buttonOne).style.backgroundColor = "rgba(99,99,99,0.2)";
      }else{
        // console.log("Div button " + buttonOne + " on cick" + " B");
        document.getElementById(buttonOne).style.backgroundColor = "rgba(99,99,99,0)";
      }
    }

    // Declare function to manage mouse out event.
    var buttonOneOnMouseOut = document.getElementById(buttonOneTouchTarget);
    buttonOneOnMouseOut.onmouseout = function(){
      // console.log("Div button " + buttonOne + " on mouse out");
      document.getElementById(buttonOne).style.backgroundColor = "rgba(99,99,99,0)";
    }

    // //
    // // DIV BUTTON TWO
    // //

    // // First add the button id found in the html
    // var buttonTwoTouchTarget = "buttonTwoTouchTarget";
    // var buttonTwo = "buttonTwo";

    // // Declare function to manage mouse over event.
    // var buttonTwoOnMouseOver = document.getElementById(buttonTwoTouchTarget);
    // buttonTwoOnMouseOver.onmouseover = function(){
    //   console.log("Div button " + buttonTwo + " on mouse over");
    //   document.getElementById(buttonTwo).style.backgroundColor = "rgba(99,99,99,0.2)";
    // }

    // // Declare function to manage mouse down event.
    // var buttonTwoOnMouseDown = document.getElementById(buttonTwoTouchTarget);
    // buttonTwoOnMouseDown.onmousedown = function(){
    //   console.log("Div button " + buttonTwo + " on mouse down");
    //   document.getElementById(buttonTwo).style.backgroundColor = "rgba(99,99,99,0.4)";
    // }

    // // Declare function to manage mouse down event on iOS Safari
    // var buttonTwoOnTouchStart = document.getElementById(buttonTwoTouchTarget);
    // buttonTwoOnTouchStart.ontouchstart = function(){
    //   console.log("Div button " + buttonTwo + " on touch start");
    //   document.getElementById(buttonTwo).style.backgroundColor = "rgba(99,99,99,0.4)";
    //   touchEnabled = true;  
    // }

    // // Declare function to manage mouse up event.
    // var buttonTwoOnMouseUp = document.getElementById(buttonTwoTouchTarget);
    // buttonTwoOnMouseUp.onmouseup = function(){
    //   if(touchEnabled === false){
    //     console.log("Div button " + buttonTwo + " on mouse up" + " A");
    //     document.getElementById(buttonTwo).style.backgroundColor = "rgba(99,99,99,0.2)";
    //   }else{
    //     console.log("Div button " + buttonTwo + " on mouse up" + " B");
    //     document.getElementById(buttonTwo).style.backgroundColor = "rgba(99,99,99,0)";
    //   }
    // }

    // // Declare function to manage mouse on click event.
    // var buttonTwoOnClick = document.getElementById(buttonTwoTouchTarget);
    // buttonTwoOnClick.onclick = function(){
    //   if(touchEnabled === false){
    //     // console.log("Div button " + buttonTwo + " on click" + " A");
    //     document.getElementById(buttonTwo).style.backgroundColor = "rgba(99,99,99,0.2)";
    //   }else{
    //     // console.log("Div button " + buttonTwo + " on cick" + " B");
    //     document.getElementById(buttonTwo).style.backgroundColor = "rgba(99,99,99,0)";
    //   }

    //   $('.dialogContainer').hide()
    // }

    // // Declare function to manage mouse out event.
    // var buttonTwoOnMouseOut = document.getElementById(buttonTwoTouchTarget);
    // buttonTwoOnMouseOut.onmouseout = function(){
    //   console.log("Div button " + buttonTwo + " on mouse out");
    //   document.getElementById(buttonTwo).style.backgroundColor = "rgba(99,99,99,0)";
    // }