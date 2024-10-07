import { Router } from 'express';
import UserModel from '../dao/models/user.model.js';
import { createHash, isValidPassword } from '../utils.js/util.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import CartManager from '../dao/db/carts-manager.js';

const cartsManager = new CartManager();

const routeSession = Router();

routeSession.post('/register', async (req, res, next) => {
    const { first_name, last_name, email, age, password } = req.body;
    try {
        const existsUser = await UserModel.findOne({email});
        if (existsUser) {
            return res.status(400).send('User has already exists');
        }

        const newCart = await cartsManager.addCart();

        const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            cartId: newCart._id
        };

        await UserModel.create(newUser);

        const token = jwt.sign({user: `${newUser.first_name} ${newUser.last_name}`, email: newUser.email, role: newUser.role}, 'coderhouse', {expiresIn: '1h'});

        res.cookie('coderCookieToken', token, {
            maxAge: 360000,
            httpOnly: true
        });

        res.redirect('current');
    }
    catch (err) {
        err.status = 500;
        next(err);
    }
});


routeSession.post('/login', async (req, res, next) => {
    const { user, password } = req.body;
    try {
        const existsUser = await UserModel.findOne({email: user});
        if (!existsUser) {
            return res.status(400).send('User not found');
        }

        if (!isValidPassword(password, existsUser)) {
            return res.status(401).send('Invalid password');
        }

        const token = jwt.sign({user: `${existsUser.first_name} ${existsUser.last_name}`, email: existsUser.email, role: existsUser.role}, 'coderhouse', {expiresIn: '1h'});

        res.cookie('coderCookieToken', token, {
            maxAge: 360000,
            httpOnly: true
        });

        res.redirect('current');

    }
    catch (err) {
        err.status = 500;
        next(err);
    }
});

routeSession.get('/current', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    if (req.user) {
        res.render('home', {user: req.user});
    }
    else {
        res.status(401).send('Unauthorized');
    }
});

routeSession.post('/logout', (req, res) => {
    res.clearCookie('coderCookieToken');
    res.redirect('/login');
});

export default routeSession;