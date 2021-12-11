const isAuthenticated = function(req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        if (req.session) {
            req.session.returnTo = req.originalUrl || req.url;
        }
        return res.redirect('/api/user/signin');
    }
    next();
};

module.exports = isAuthenticated;