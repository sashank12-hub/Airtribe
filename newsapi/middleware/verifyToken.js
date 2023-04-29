const jwt =require('jsonwebtoken');

const isTokenValid =(exp)=>{
    const currentTime = new Date().getTime();
    return exp > currentTime;
}

const jwtCallback = (err,data,req,next) =>{
    if(err){
        req.body.email = undefined;
        req.body.message = "wrong token"
        next();
    }
    else {
        const { email,exp} =data;
        const isValidToken =  isTokenValid(exp*1000);
        if(!isValidToken){
            req.body.email = undefined;
            req.body.message = "token expired"
            next();
        }
        else {
            req.body.email =email;
            next();
        }
       
    }
   
    


}

const verifyToken =(req,res,next)=>{

    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET, (err,data)=>jwtCallback(err,data,req,next));   
    }
    else {
        req.body.email = undefined;
        req.body.message = "pls sign in"
        return next();
    }
   
}

module.exports =verifyToken;