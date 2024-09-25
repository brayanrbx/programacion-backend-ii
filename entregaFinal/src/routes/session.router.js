import { Router } from 'express';
import userModel from '../dao/models/user.model.js';
import { createHash, isValidPassword } from '../utils.js/util.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import CartManager from "../dao/db/carts-manager.js";

const cartsManager = new CartManager();

const routeSession = Router();

routeSession.post('/register', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const existsUser = await userModel.findOne({email});
        if (existsUser) {
            return res.status(400).send('User has already exists');
        }

        const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            cartId: cartsManager.addCart()
        };

        await userModel.create(newUser);

        const token = jwt.sign({user: newUser.email ,name: `${newUser.first_name} ${newUser.last_name}`, rol: newUser.rol}, 'coderhouse', {expires: '1h'});

        res.cookie('coderCookieToken', token, {
            maxAge: 360000,
            httpOnly: true
        });

        res.redirect('/api/sessions/current');
    }
    catch (error) {
        err.status = 500;
        next(err);
    }
});


routeSession.post('/login', async (req, res) => {
    const { user, password } = req.body;

    try {
        const existsUser = await userModel.findOne({user});
        if (!existsUser) {
            return res.status(400).send('User not found');
        }

        if (!isValidPassword(password, existsUser)) {
            return res.status(401).send('Invalid password');
        }

        const token = jwt.sign({user: existsUser.email ,name: `${existsUser.first_name} ${existsUser.last_name}`, rol: existsUser.rol}, 'coderhouse', {expires: '1h'});

        res.cookie('coderCookieToken', token, {
            maxAge: 360000,
            httpOnly: true
        });

        res.redirect('api/sessions/current');

    }
    catch (err) {
        err.status = 500;
        next(err);
    }
});

routeSession.get('/current', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    if (req.user) {
        res.render('home', {user: req.user.user});
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