const jwt = require('jsonwebtoken');
module.exports = (res, next)=>{
    let token = localStorage.getItem('userToken');
    if(token){
        next(null,{});
    }else{
        console.log("erreur");
        window.location.href="/auth/login-page";
    }
};