const CheckSession = (req, res, next) => {
    if (req.session.admin) {
        next();
    } else {
        res.redirect('/admin/login'); // Redirect to login if no session
    }
};

const isLogin = (req, res, next) => {
    if (req.session.admin) {
        res.redirect('/admin/dashboard'); // Redirect logged-in users to home
    } else {
        next();
    }
};

module.exports = { CheckSession, isLogin };
