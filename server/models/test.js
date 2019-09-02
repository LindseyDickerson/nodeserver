     //7                    //1
module.exports = function (sequelize, DataTypes) {
                      //2    //3  
    return sequelize.define('test', { //
         //5         //6
        testdata: DataTypes.STRING
    });
};