class Fighter {
    constructor(name, type){
        this.name = name;
        this.type = type;
    }

    setStats(hp, mp, ap, def, agi){
        this.hp = hp;
        this.mp = mp;
        this.ap = ap;
        this.def = def;
        this.agi = agi;
    }

    getStats(){
        return this.hp, this.mp, this.ap, this.def, this.agi;
        console.log(this.hp, this.mp, this.ap, this.def, this.agi); //test method, remove later
    }


}

var protagonist1 = new Fighter("Cloud", "Warrior");
protagonist1.setStats(100, 30, 75, 60, 20);
