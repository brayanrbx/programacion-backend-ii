import { Router } from 'express';
import passport from 'passport';
import UserController from '../controllers/user.controller.js';

const routeSession = Router();

routeSession.post('/register', UserController.register);

routeSession.post('/login', UserController.login);

routeSession.get('/current', passport.authenticate('jwt', { session: false }), UserController.current);

routeSession.post('/logout', UserController.logout);

export default routeSession;