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
var warrior = new Fighter("warrior", 6, 3, 150, 1);
var knight = new Fighter("knight", 2, 4, 200, 2);
var mage = new Fighter("mage", 7, 2, 100, 3);
var ninja = new Fighter("ninja", 4, 8, 125, 4);
var fighterArray = [warrior, knight, mage, ninja];

//vARiaBleS
var newGame = true; //basically "new game"
var chooseEnemy = false;
var theHero;
var theEnemy;

displayStatReset(); //called initially to display the correct stats

//When a fighter is selected, the rest move down to the defender area
$(".fighter-box").click(function () {
    if (newGame) {
        $(this).addClass("chosenAttacker");
        $("#action-log").css("display", "block");
        $("#action-display").text("Choose a defender!");
        let fighterSelection = $(this).attr("value");
        fighterArray.forEach(element => {
            if (element.ID == fighterSelection) {
                console.log(element);
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
        // var newEnemy;
        $(this).appendTo("#currentEnemy");
        $(this).addClass("target");
        $("#action-display").text("Press the Attack button to deal some damage!");
        $("#attack").css("display", "block");
        let enemySelection = $(this).attr("value");
        fighterArray.forEach(element => {
            if (element.ID == enemySelection) {
                console.log(element);
                theEnemy = element;
            }
        });
        chooseEnemy = false;
        play(theHero, theEnemy);
    }
})



/*Damage calculations and win conditions*/
function play(fighter, enemy) {
    $("#attack").click(function () {
        if (fighter.hp > 0 && enemy.hp > 0) {
            enemy.hp = enemy.hp - fighter.ap;
            console.log("Current Enemy HP:" + enemy.hp) //test function
            $(".target .hp").text(enemy.hp);
            fighter.hp = fighter.hp - enemy.cap;
            $(".chosenAttacker .hp").text(fighter.hp);
            console.log("current fighter hp: " + fighter.hp); //test function
            $("#action-display").text("You did " + fighter.ap + " damage and took " + enemy.cap + " damage");
            fighter.attackUp();
            console.log(fighter.ap); //test function
            if (enemy.hp <= 0) {
                $(".target").css("display", "none");
                $("#action-display").text("Choose a new enemy!");
                if (!$("#enemyArea").is(":empty")) {
                    chooseEnemy = true;
                    $("#action-display").text("Excellent! Choose a new defender!")
                } else {
                    alert("YOU WIN");
                }
            }
            if (fighter.hp <= 0) {
                $("action-display").text("GAME OVER (press the reset button to try again)");
            }
        }
    })
}

/*Resets the entire game area and resets all fighter stats back to their original*/
$("#reset").click(function () {
    $(".fighter-box").removeClass("defender target chosenAttacker");
    $(".fighter-box").css("display", "block");
    $("#fighter-area").append($(".fighter-box"));
    $("#action-log").css("display", "none");
    $("#action-display").empty();
    fighterArray.forEach(element => {
        element.hp = element.baseHp;
        element.ap = element.baseAp;
    })
    displayStatReset();
    newGame = true;
    enemySelect = false;
})

//Resets the HP display of each fighter on the DOM
function displayStatReset() {
    $(".warrior .hp").text(warrior.baseHp);
    $(".knight .hp").text(knight.baseHp);
    $(".mage .hp").text(mage.baseHp);
    $(".ninja .hp").text(ninja.baseHp);
}






