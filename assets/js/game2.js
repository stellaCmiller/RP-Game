/*Actual homework specifications */

//AP = AttackPower, CAP = CounterAttackPower, HP = HealthPoints
function Fighter(name, baseAp, cap, hp) {
    this.name = name;
    this.baseAp = baseAp;
    this.ap = baseAp;
    this.cap = cap;
    this.hp = hp;
    this.attack = function () { //increases AP after each attack
        this.ap = (this.ap + this.baseAp);
    }
    this.getHP = function () { //returns the HP of the fighter
        return this.hp;
    }
}

//Fighter objects are created with different stats
var warrior = new Fighter("warrior", 6, 3, 150);
var knight = new Fighter("knight", 2, 4, 200);
var mage = new Fighter("mage", 7, 2, 100);
var ninja = new Fighter("ninja", 4, 4, 125);

//Fuckloads of global variables, probably not good practice but w/e
var preSelect = true; //Ensures that the click handler for the fighters only operates at first click
var defenderSelect = false; //When true, allows the user to select a defender to fight
var enemies = [];

//When a fighter is selected, the rest move down to the defender area
$("document").ready(
    $(".fighter").click(function () {
        while(preSelect){
            let fighterSelector = $(this).attr("value");
            switch (fighterSelector) {
                case "1":
                    console.log("fighter 1 was clicked"); //test functions
                    boardSetUp(warrior);
                    break;

                case "2":
                    console.log("fighter 2 was clicked");
                    boardSetUp(knight);
                    break;

                case "3":
                    console.log("fighter 3 was clicked");
                    boardSetUp(mage);
                    break;

                case "4":
                    console.log("fighter 4 was clicked");
                    boardSetUp(ninja);
                    break;
            }
            preSelect = false;
        }
    })
)

//when a defender is selected, it moves up to the current enemy box
function chooseEnemy(){
    $(".defender").click(function(){
        if (defenderSelect){
            $(this).appendTo("#currentEnemy");
            defenderSelect = false;
            $("#action-display").text("Press the Attack button to deal some damage!")
        }
    })
}


/*Closest thing I got to a main method I guess */
function play(fighter){
    chooseEnemy();
    fight(fighter);

}

/*Puts the fighters not selected by the player into the defenders area */
function boardSetUp(fighter) {
    $(".fighter-box").each(function () {
        if (!$(this).hasClass(`${fighter.name}`)) {
            $(this).addClass("defender");
            $("#enemyArea").append($(this));
        }
    })
    $("#action-log").css("display","block");
    defenderSelect = true;
    play(fighter);
}

/*Resets the entire game area*/
$("#reset").click(function(){
    $("#fighter-area").append($(".fighter-box"));
    $(".fighter-box").removeClass("defender");
    $("#action-log").css("display","none");
    preSelect = true;
})







