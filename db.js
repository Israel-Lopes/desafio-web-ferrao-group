const bcrypt = require('bcryptjs') 

function createUser(nome, senha, email, callback){
    const cryptPwd = bcrypt.hashSync(password, 10)
    global.db.collection("usuarios").insert({ nome, senha: cryptPwd, email }, function(err, result){
        callback(err, result)
    })
}

function findUser(email, callback){
    global.db.collection("usuarios").findOne({email}, callback)
}

function changePassword(email, senha){
    const cryptPwd = bcrypt.hashSync(password, 10)
    global.db.collection("usuarios").updateOne({email}, {$set:{senha: cryptPwd}})
}
module.exports = { createUser, findUser, changePassword }
