 var gamePattern=[];
 var buttonColors=["red","yellow","blue","green"];
 var userClickedPattern=[];
 var randomChosenColor;
 var started=false;
 
var level=0;

function nextSequence(){
     userClickedPattern=[];
     level++;
     $("h1").text("Level "+ level); //****not specified where to add this-->correct
    //  CREATING RANDOM NUMBER
     var randomNumber= Math.random();
     randomNumber=Math.floor((randomNumber*3)+1);

//CHOOSING THE RANDOM COLOR
    randomChosenColor=buttonColors[randomNumber];

//PUSHING THE RANDOMLY CHOSEN COLOR TO THE GAME PATTERN ARRAY     
gamePattern.push(randomChosenColor); 


//ANIMATING THE RANDOM COLOR CHOSEN
$("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);



// ADDING SOUND ON CLICK
makeSound(randomChosenColor);



    

  
    
    
   

  
}

$(".btn").on("click",function(){
 // storing the color chosen by the user in this variable
     userChosenColor=this.id;
 
     userClickedPattern.push(userChosenColor);
 // ADDING SOUND ON CLICK
     makeSound(userChosenColor);
     animatePress(userChosenColor);
      // TO CHECK THE ANSWER OF THE USER
     checkAnswer(userClickedPattern.length-1);
 
      
    
  });
// I think I had included this function inside thee "nextSequence" and so multiple sounds got played .
function makeSound(name){
 var audio = new Audio("sounds/" + name + ".mp3");
 audio.play();}
    




//ADDING SHADOW ANIMATIONS TO THE BUTTON THAT THE USER CLICKED
function animatePress(currentColor){
     var activeButton=$("."+currentColor);
     

// adding and removing the class to cause animations
activeButton.addClass("pressed");
setTimeout(function(){
    
     activeButton.removeClass("pressed");
     
     },100); 


}
$(document).on("keydown",function(){
   //calling this only once when the game starts
   if(!started){
     $("h1").text("Level "+level);    //***bug :being called every time I press a key */ level-0 not coming 
     nextSequence();
     started=true;
   }
  
    



}); // FUNCTION TO CHECK THE ANSWER OF THE USER
function checkAnswer(currentLevel){
    
     if(userClickedPattern[currentLevel]==gamePattern[currentLevel]) {// the bugs in my code were because I had not put the braces for the if-loop
      console.log("Success");
   //CHECKING IF THE LENGTH OF THE GAME PATTERN IS EQUAL TO THE USER CLICKED PATTERN
   if(userClickedPattern.length===gamePattern.length)
      setTimeout(function(){
          nextSequence();
            
                
                },1000); }
else
     { 

          $("h1").text("Game Over, Press Any Key to Restart");
          $("body").addClass("game-over");
          setTimeout(function(){
    
              $("body").removeClass("game-over");
               
               },200); 
          var wrong=new Audio("sounds/wrong.mp3");
      wrong.play();
      $(document).on("keydown",function(){   startOver();})
  }
                

 }
 function startOver(){
      level=0;
      gamePattern=[];
      started=false;
 }


 // Generating Random Colors





// $(document).ready(() => {
//     setInterval(() => {
//         $('p').fadeIn();
//         $('p').fadeOut();
//     }, 500);
// });

// $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

// var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
// audio.play();
// var buttonColours = ["red", "blue", "green", "yellow"];

// var gamePattern = [];



//********** */ THE SHIT I DID !!!! *********************



// //$("#green").css("color","red");
// for(var i=0;i<buttonColors.length;i++){
// document.querySelectorAll(".btn")[i].addEventListener("onanimationstart",function(){
//      makeSound(randomChosenColor);
//      });
// }




//*************No need of this long code**************
// function makeSound(randomChosenColor){
// switch(randomChosenColor){
// case "red":
// var red=new Audio("sounds/red.mp3");
     
//      red.play();
//      break;
// case "yellow":
//  var yellow=new Audio("sounds/yellow.mp3");
// yellow.play();
// break;
// case "green":
//      var green=new Audio("sounds/green.mp3");
//      green.play();
//           break;
// case "blue":
//      var blue=new Audio("sounds/blue.mp3");
//      blue.play();
//      break;
// }}

//Okay so the logic lies here
//  First of all we started by creating the "nextSequence" function  where we formed randomNumber and chose a random color from the
//  color list->"buttonColors". Once the coors are chosen we pushed the pattern of the color chosen by the computer to the gamePattern array.
//  And that randomColor is accompanied by a sound and animation(calling the respective functions for that)
 
 
//  As soon as the user "clicks", the eventListener is activated and and we add the user chosen pattern in the respective array "userClickedPattern"
 
//  For starting the game we prompt the user to press a keyboard button. We need to make sure that it is pressed only once(just to start the game). Once started we increment the levels.
//  So for this we made use of the variable "started".
 
 
//  The main concept lies in the checkAnswer function:
//  First when the user presses the keyboard button the function nextSequence is called which chooses the button and hence showa the corresponding animation and sound.
//  Seeing this the user clicks a button, now
 
//  If that level of userClickedPattern array is same as the same level of gamePattern array 
//  we move to check the length of both....if they are also same then it means the user clicked the right button and we again call the nextSequence for another random color generation.
//  Note that every time the nextSequence array is called we empty the userClickedPattern array.
 
//  Now for level 2  time what happens is that the user needs to click the prev as well as the current button. And we had made the userClicked array empty....
//  but not the gamePattern array and so the new colour generated by computer is added along with the prev one.
//  and so  the button he clicked now is at userClickedPattern[0]. And so the first if statement checks the userClickedPattern[0] with gamePattern[0]. And then when the second
//  "if" is checked then length is not same cz gamePattern has length of 2 but userClickedPattern has length 1. And so THE nextSeqeunce FUBCTION IS NOT CALLED AND AS SOON AS THE USER CLICKS THE SECOND BUTTON THE
//  SAME PROCESS IS REPEATED AND THIS TIME THE LENGTH MATCHES....HENCE nextSequence FUNCTION IS CALLED FOR THE NEXT LEVEL.
 
//  LIKE THIS THE GAME CONTINUES :)
 
 
//  At last we added the wrong button sound and the red flash in the else part.
//  Also we added a key listener....when the user clicks the wrong button. When the user presses any key the the two functions are triggered
//  1. The one we added before for starting the game where we stated "started=0"
//  2. The else pary function. this function when triggered calls the startover function which resets all the values and once all the values are resetted "started" becomes 0 and so the previous 
//  function (1.) is also called starting the game all over again.