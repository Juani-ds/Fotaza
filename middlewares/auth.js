export const requireAuth = (req, res, next) => {
    if (!req.session.usuario) {
        return res.redirect('/auth/login');
    }
    next();
};

export const requireGuest = (req, res, next) => {
    if (req.session.usuario) {
        return res.redirect('/');
    }
    next();
};