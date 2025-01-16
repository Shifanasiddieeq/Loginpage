const CheckSession = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/user/login'); // Redirect to login if no session
    }
};

const isLogin = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/user/home'); // Redirect logged-in users to home
    } else {
        next();
    }
};

module.exports = { CheckSession, isLogin };
