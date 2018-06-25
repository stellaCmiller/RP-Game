/*Actual homework specifications */

//AP = AttackPower, CAP = CounterAttackPower, HP = HealthPoints
function Fighter(name, baseAp, cap, hp){
    this.name = name;
    this.baseAp = baseAp;
    this.ap = baseAp;
    this.cap = cap;
    this.hp = hp;
    this.attack = function(){ //increases AP after each attack
        this.ap = (this.ap + this.baseAp); 
    }
    this.getHP = function(){ //returns the HP of the fighter
        return this.hp; 
    }
}

//Fighter objects are created with different stats
var warrior = new Fighter("warrior", 6, 3, 150);
var tank = new Fighter("tank", 2, 4, 200);
var mage = new Fighter("mage", 7, 2, 100);
var someFourthClass = new Fighter("dolan", 4, 4, 125);
var fighterArray = [warrior, tank, mage, someFourthClass];

//Displays the heroes' health below his picture
fighterArray.forEach(element => {
    let protag = $("<h3>");
    protag.text(`Hp: ${element.getHP()}`);
    protag.addClass("col-md-3");
    $("#fighter-stats").append(protag);
});


//When a fighter is selected, the rest disappear
$("document").ready(
    $(".fighter").click(function() {
        fighterSelector = $(this).attr("value");
        switch(fighterSelector){
            case "0":
                console.log("fighter 1 was clicked");
                play(warrior);
                break;

            case "1":
                console.log("fighter 2 was clicked");
                play(tank);
                break;

            case "2":
                console.log("fighter 3 was clicked");
                play(mage);
                break;
            
            case "3":
                console.log("fighter 4 was clicked");
                play(someFourthClass);
                break;
        }
    })
)

//Actually plays the game, woot
function play(fighter){

}
