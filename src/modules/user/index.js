const UserScheme = require('../../models/user');

class UserModule {
    static async findOne(params) {
        return UserScheme.findOne(params);
    }

    static async findByEmail(email) {
        return this.findOne({email: email});
    }

    static async create(name, email, password, contactPhone) {
        const newUser = new UserScheme({name, email, contactPhone});
        newUser.setPassword(password);
        return newUser.save();
    }

    static verify(username, password, done) {
        UserScheme.findOne({email: username}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }

            if (!user.validPassword(password)) {
                return done(null, false);
            }

            // `user` будет сохранен в `req.user`
            return done(null, user);
        });
    }

    static findById(id, cb) {
        UserScheme.findById(id, function (err, user) {
            if (err) { return cb(err) }
            cb(null, user);
        });
    }
}

module.exports = UserModule;