const passport = require('passport');
const bcrypt = require('bcrypt');
const local_strategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = () => {
    passport.use(new local_strategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        try {
            const ex_user = await User.findOne({ where: { email } });
            if(ex_user) {
                const result = await bcrypt.compare(password, ex_user.password);
                if(result) {
                    done(null, ex_user);
                } else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                }
            } else {
                done(null, false, { message: '존재하지 않는 아이디입니다.' });
            }
        } catch(error) {
            console.error(error);
            done(error);
        }
    }));
};