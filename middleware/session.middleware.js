var shortId = require('shortid');
var db = require('../db')

module.exports = (req,res,next) => {
    if(!req.signedCookies.sessionId){
        var sessionId = shortId.generate();
        res.cookie('sessionId', sessionId,{
            signed : true
        });

        db.get('sessions').push({
            id: sessionId
        }).write();
    }
 
    if(req.signedCookies.userId){
        var x = db.get('users').find({id : req.signedCookies.userId}).value()
        //console.log(x.name);
        res.locals.userName = x.name; 

        // ko có userId thì mới được add userId vô session
        var userCart = db.get('sessions').find({userId : req.signedCookies.userId }).value()

        if(!userCart){
            //db.get('sessions').remove({userId : req.signedCookies.userId }).write()
            db.get('sessions')
              .find({id: req.signedCookies.sessionId})
              .set('userId' , req.signedCookies.userId)
              .write();
        }

        //show numberCart của user
        var countU = 0

        if(userCart.cart){
            for (let [key, value] of Object.entries(userCart.cart)) {
            
                countU = countU + value;
                
            }
        }
        console.log(countU);
        res.locals.numberCart = countU;
    }   

    if(req.signedCookies.sessionId){
        var count = 0

        var cart = db.get('sessions').find({id : req.signedCookies.sessionId}).value()
        //console.log(cart.cart);

        if(cart.cart){
            for (let [key, value] of Object.entries(cart.cart)) {
                //console.log(key + ': ' + value);
                count = count + value;
                
            }
        }

        //console.log(count);      show numberCart của guess
        if(!req.signedCookies.userId){
            res.locals.numberCart = count;
        }
               
    }

    next();
};