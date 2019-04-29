/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var diceRoll = 0;
var guessArray = [];
/*Audio files*/
var win = new Audio();
win.src = "css/audio/defdance.mp3";

var lose = new Audio();
lose.src = "css/audio/Fail2.wav";


function playSoundWin(){
    win.play();
}
function playSoundLose(){
    lose.play();
    }

function valintanappi(valintanapit) {
    var valittu = "";
    // käydään valintanappiryhmä läpi
    for(var i = 0; i < valintanapit.length; i++) {
        // tutkitaan, mikä on valittu
        if (valintanapit[i].checked) {
            // valitun value-arvo otetaan talteen
            valittu = valintanapit[i].value;
        }
    }
    // palautetaan kutsuvalle value-arvo
    // huom! palautuu merkkitietoa, string
    return valittu;
}

function ROLLTHEDICE(min, max) {
    return Math.floor(Math.random()*(max - min + 1)) + min;
}


function aloitus(){
    var choiceCheck = document.getElementsByName("muoto");
    var choice = valintanappi(choiceCheck);
    if (choice === "1") {
       diceRoll = ROLLTHEDICE(0, 10);
       document.getElementById("dialog").innerHTML = "<br>GAME START! Guess the number!<br>&nbsp;";
    }
    if (choice === "2") {
       diceRoll = ROLLTHEDICE(-10, 10);
       document.getElementById("dialog").innerHTML = "<br>GAME START! Guess the number!<br>&nbsp;";
    }
    if (choice === "3") {
       diceRoll = ROLLTHEDICE(0, 20);
       document.getElementById("dialog").innerHTML = "<br>GAME START! Guess the number!<br>&nbsp;";
    }
    document.getElementById("start").disabled = true;
    document.getElementById("check").disabled = false;
    document.getElementById("quit").disabled = false;
}

function tarkistus(){
    var guess = Number(document.getElementById("arvaus").value);

    
    if (guess === diceRoll) {
        guessArray.push(guess);
        document.getElementById("dialog").innerHTML = ("You got it! Congratulations! <br>Guesses: " + guessArray.length + "<br>Your previous guesses: " + guessArray);
        guessArray = [];
        playSoundWin();
        document.getElementById("start").disabled = false;
        document.getElementById("check").disabled = true;
        document.getElementById("quit").disabled = true;
        document.getElementById("tulos").innerHTML = "";}
    else if (guess > diceRoll) {
        document.getElementById("dialog").innerHTML = ("<br>Your guess is too high!<br>&nbsp;");
        guessArray.push(guess);
    }
    else if (guess < diceRoll) {
        document.getElementById("dialog").innerHTML = ("<br>Your guess is too low!<br>&nbsp;");
        guessArray.push(guess);
    }
    
   document.getElementById("arvaus").value = "";
}

function lopetus(){
    document.getElementById("dialog").innerHTML = ("GAME OVER! You couldn't do it... <br>Correct answer: " + diceRoll + "<br>Your previous guesses: " + guessArray);
    guessArray = [];
    playSoundLose();
    document.getElementById("arvaus").innerHTML = "";
    diceRoll = 0;
    document.getElementById("start").disabled = false;
    document.getElementById("check").disabled = true;
    document.getElementById("quit").disabled = true;
}