var mongodb =require('./db');

function User(user){
    this.name = user.name;
    this.password = user.password;
}

module.exports = User;

User.prototype.save = function save(cb){
    var user = {
        name : this.name,
        password: this.password
    };
    mongodb.open(function(err,db){
        if (err){
            return cb(err);
        }
        db.collection('users',function(err,collection){
            if (err){
                mongodb.close();
                return cb(err);
            }
            //add username index
            collection.ensureIndex('name',{unique:true});
            //add user to db
            collection.insert(user,{safe:true}, function(err,user){
                mongodb.close();
                cb(err,user);
            });

        });
    });
};

User.prototype.getUser = function getUser(username,cb){
    mongodb.open(function(err,db){
        if (err){
            return callback(err);
        }
        db.collection('users',function(err,collection){
            if(err){
                mongodb.close();
                return cb(err);
            }
            //find user from collections
            collection.findOne({name : username},function(err,doc){
                mongodb.close();
                if (doc){
                    var user = new User(doc);
                    cb(err,user);
                }else{
                    cb(err,null);
                }
            });
        });
    });
};

