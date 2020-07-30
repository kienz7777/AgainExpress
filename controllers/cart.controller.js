var db = require('../db');

module.exports.addToCart = (req,res,next) => {
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;

    if(!sessionId){
        res.redirect('/products');
        return;
    }

    var count = db
        .get('sessions')
        .find({id: sessionId})
        .get('cart.' + productId, 0)
        .value();

    db.get('sessions')
      .find({id: sessionId})
      .set('cart.' + productId, count + 1)
      .write();

    if(req.signedCookies.userId){

        var countC = db
            .get('sessions')
            .find({userId: req.signedCookies.userId})
            .get('cart.' + productId, 0)
            .value();

        db.get('sessions')
          .find({userId: req.signedCookies.userId})
          .set('cart.' + productId, countC + 1)
          .write();
    }

    res.redirect('/products');
};