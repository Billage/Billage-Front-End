const passport = require('passport');
const kakao_strategy = require('passport-kakao').Strategy;
const User = require('../models/user');

module.exports = () => {
    passport.use(new kakao_strategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(profile);
        try {
            const ex_user = await User.findOne({
                where: { sns_id: profile.id, provider: 'kakao' },
            });
            if(ex_user) {
                done(null, ex_user);
            } else {
                const new_user = await User.create({
                    sns_id: profile.id,
                    provider: 'kakao',
                });
                done(null, new_user);
            }
        } catch(error) {
            console.error(error);
            done(error);
        }
    }));
};
    