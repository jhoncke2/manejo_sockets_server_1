const {v4:uuidV4} = require('uuid');
class Civilization{

    constructor(name = 'no_name'){
        this.id = uuidV4();//identificador id
        this.name = name;
        this.votes = 0;
    }
}

module.exports = Civilization;