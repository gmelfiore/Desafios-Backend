export const restrictAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return res.status(403).send('Acceso denegado. Los administradores no pueden acceder a esta ruta.');
    }

    next();
};