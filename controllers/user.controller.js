var db = require('../db');
var shortid = require('shortid')

module.exports.index = (req, res) => { 
    res.render('users/index',{
        users: db.get('users').value()
    }) 
}

module.exports.search = (req, res) => { 
    var q = req.query.q;
    // var t = req.query.t;
    var matchedUsers = db.get('users').value().filter( (user) => {
      
        return user.name.toLowerCase().indexOf(q.toLocaleLowerCase()) !== -1;
    });

    //console.log(matchedUsers);
    // console.log(q);
    // console.log(t)    http://localhost:3000/search?q=572&t=ko;
    res.render('users/index', {
        users : matchedUsers
    }); 
    
}

module.exports.create = (req, res) =>{
    console.log(req.cookies);
    res.render('users/create', {
        
    }); 
}

module.exports.get = (req,res) => {
    
    var ids = req.params.ids;

    var user = db.get('users').find({id: ids}).value();

    res.render('users/view',{
        user: user
    })

}

module.exports.postCreate = (req, res) =>{
    
    req.body.id = shortid.generate();

    var count = 0;
    for( var key in req.body ) {
        if( req.body.hasOwnProperty(key) ) {
            ++count;
        }
    }

    if(req.body.id && req.body.name && req.body.phone && count == 3){
        db.get('users').push(req.body).write();
        res.redirect('/users');
    }
    
    console.log(count);
    //db.get('users').push(req.body).write();
    res.redirect('/users');
    
}