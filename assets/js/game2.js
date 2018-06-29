/*Actual homework specifications */

//AP = AttackPower, CAP = CounterAttackPower, HP = HealthPoints
function Fighter(name, baseAp, cap, baseHp, ID) {
    this.name = name;
    this.baseAp = baseAp;
    this.ap = baseAp;
    this.cap = cap;
    this.baseHp = baseHp;
    this.hp = baseHp;
    this.ID = ID;
    this.attackUp = function () { //increases AP after each attack
        this.ap = (this.ap + this.baseAp);
    }
}

//Fighter objects are created with different stats
var warrior = new Fighter("warrior", 6, 6, 150, 1);
var knight = new Fighter("knight", 2, 8, 200, 2);
var mage = new Fighter("mage", 7, 4, 100, 3);
var ninja = new Fighter("ninja", 4, 12, 125, 4);
var fighterArray = [warrior, knight, mage, ninja];

//vARiaBleS
var newGame = true;
var chooseEnemy = false;
var theHero;
var theEnemy;

displayStatReset(); //called initially to display the initial stats

//When a fighter is selected, the rest move down to the defender area
$(".fighter-box").click(function () {
    if (newGame) {
        $(this).addClass("chosenAttacker");
        $("#action-log").css("display", "block");
        $("#action-display").text("Choose a defender!");
        let fighterSelection = $(this).attr("value");
        fighterArray.forEach(element => {
            if (element.ID == fighterSelection) {
                theHero = element;
            }
        })
        moveBuddies();
        newGame = false;
        chooseEnemy = true;
    }
})

function moveBuddies() {
    $(".fighter-box").each(function () {
        if (!$(this).hasClass("chosenAttacker")) {
            $(this).addClass("defender");
            $("#enemyArea").append($(this));
        }
    })
}

//when a defender is selected, it moves up to the current enemy box
$("body").on("click", ".defender", function () {
    if (chooseEnemy) {
        $(this).appendTo("#currentEnemy");
        $(this).addClass("target");
        $("#action-display").text("Press the Attack button to deal some damage!");
        $("#attack").css("display", "block");
        let enemySelection = $(this).attr("value");
        fighterArray.forEach(element => {
            if (element.ID == enemySelection) {
                theEnemy = element;
            }
        });
        chooseEnemy = false;
    }
})

/*Damage calculations and win conditions*/
$("#attack").click(function () {
    if (theHero.hp > 0 && theEnemy.hp > 0) {
        theEnemy.hp = theEnemy.hp - theHero.ap;
        $(".target .hp").text(theEnemy.hp);
        theHero.hp = theHero.hp - theEnemy.cap;
        $(".chosenAttacker .hp").text(theHero.hp);
        $("#action-display").text("You did " + theHero.ap + " damage and took " + theEnemy.cap + " damage");
        theHero.attackUp();
        console.log(theHero.hp);
    }
    if (theHero.hp <= 0) {
        $("#action-display").text("GAME OVER (press the reset button to try again)");
    } else if (theEnemy.hp <= 0) {
            $(".target").css("display", "none");
            if (!$("#enemyArea").is(":empty")) {
                chooseEnemy = true;
                $("#action-display").text("Excellent! Choose a new defender!")
            } else {
                $("#action-display").text("Press the RESET button to play again!");
                alert("YOU WIN");
                $("#attack").css("display", "none");
            }
        } 
})

/*Resets the entire game area and resets all fighter stats back to their original*/
$("#reset").click(function () {
    $(".fighter-box").removeClass("defender target chosenAttacker");
    $(".fighter-box").css("display", "block");
    $("#fighter-area").append($(".fighter-box"));
    $("#action-log").css("display", "none");
    $("#attack").css("display", "none");
    $("#action-display").empty();
    fighterArray.forEach(element => {
        element.hp = element.baseHp;
        element.ap = element.baseAp;
    })
    displayStatReset();
    newGame = true;
    chooseEnemy = false;
})

//Resets the HP display of each fighter on the DOM
function displayStatReset() {
    $(".warrior .hp").text(warrior.baseHp);
    $(".knight .hp").text(knight.baseHp);
    $(".mage .hp").text(mage.baseHp);
    $(".ninja .hp").text(ninja.baseHp);
}






