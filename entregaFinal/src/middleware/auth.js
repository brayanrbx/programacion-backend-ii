const soloAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    }
    else {
        res.status(403).send('Unauthorized access, only admins can access');
    }
}

const soloUser = (req, res, next) => {
    console.log(req);
    if (req.user.role === 'user') {
        next();
    }
    else {
        res.status(403).send('Unauthorized access, only users can access');
    }
}

export { soloAdmin, soloUser }