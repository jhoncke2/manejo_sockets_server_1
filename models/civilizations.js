const Civilization = require("./civilization");

class Civilizations{
    constructor(){
        this.civilizations = [];
    }

    addCivilization(civilization = new Civilization()){
        this.civilizations.push(civilization);
    }

    get civilization(){
        return this.civilizations;
    }

    removeCivilization(id){
        this.civilizations = this.civilizations.filter(civil => civil.id != id);
    }

    voteCivilization(id){
        this.civilizations = this.civilizations.map(civil=>{
            if(civil.id == id)
                civil.votes ++;
            return civil;
        });
    }
}

module.exports = Civilizations;