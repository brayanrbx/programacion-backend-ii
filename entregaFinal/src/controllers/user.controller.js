import UserService from "../services/user.service.js";
import UserDto from "../dto/user.dto.js";
import jwt from "jsonwebtoken";

class UserController {
    async register(req, res, next) {
        try {
            const newUser = await UserService.registerUser(req.body);
            const token = jwt.sign({user: `${newUser.first_name} ${newUser.last_name}`, email: newUser.email, role: newUser.role}, 'coderhouse', {expiresIn: '1h'});

            res.cookie('coderCookieToken', token, {maxAge: 360000, httpOnly: true});
            res.redirect('/api/sessions/current');
        }
        catch (error) {
            error.status = 500;
            next(error);
        }
    }

    async login(req, res, next) {
        const { user, password } = req.body;
        try {
            const loggedUser = await UserService.loginUser(user, password);
            const token = jwt.sign({user: `${loggedUser.first_name} ${loggedUser.last_name}`, email: loggedUser.email, role: loggedUser.role}, 'coderhouse', {expiresIn: '1h'});
            res.cookie('coderCookieToken', token, {maxAge: 360000, httpOnly: true});
            res.redirect('/api/sessions/current');
        }
        catch (error) {
            error.status = 500;
            next(error);
        }
    }

    async current(req, res, next) {
        if (req.user) {
            const user = req.user;
            const userDto = new UserDto(user);
            res.render('home', { user: userDto });
        }
        else {
            res.send('Not authorized');
        }
    }

    logout(req, res) {
        res.clearCookie('coderCookieToken');
        res.redirect('/login');
    };
}

export default new UserController();