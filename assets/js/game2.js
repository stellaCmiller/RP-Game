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
var preSelect = true; //Ensures that the click handler for the fighters only operates at first click
var enemies = [];

//When a fighter is selected, the rest disappear
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

function boardSetUp(fighter) {
    $(".fighter-box").each(function () {
        if (!$(this).hasClass(`${fighter.name}`)) {
            $("#enemyArea").append($(this));
        }
    })
}


$("#reset").click(function(){
    $("#fighter-area").append($(".fighter-box"));
    preSelect = true;
})







