var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var flag = false;


// --------- Starting the Game------------------
$(document).on("keypress", function(){
    if (!flag) {
        $("h1").text("Level " + level);
        nextSequence();
        flag = true;
    }
});


$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    // play sound
    playSound(userChosenColor);
    // animate
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});
  

function nextSequence(){

    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Animate 
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    // sound
    playSound(randomChosenColor);
}



function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}



function checkAnswer(currentLevel){
    
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        console.log("success");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){nextSequence();}, 1000);
        }
    }

    else {

        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}


function startOver(){
    level = 0;
    gamePattern = [];
    flag = false;
}
