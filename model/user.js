const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const table = new mongoose.Schema({
    nomeusuario: {type:String},
    email: {type:String,unique:true},
    nomecompleto: {type:String},
    telefone: {type:String},
    senha: {type:String},
    datacadastro: {type:Date,default:Date.now},
})


table.pre("save",function(next){
    let cliente = this;
    if(!cliente.isModified('senha')) return next()
    bcrypt.hash(cliente.senha,10,(erro,encrypt)=>{
        cliente.senha = encrypt
        return next()
    })
})

module.exports = mongoose.model("users_table",table)