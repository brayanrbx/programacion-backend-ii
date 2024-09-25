//1) Instalamos: npm i passport passport-jwt
//2) Importamos:

import passport from "passport";
import jwt from "passport-jwt";
//Guarda! Cuidado! Acá importamos de "passport-jwt"

const JWTStrategy = jwt.Strategy; //Core de la estrategia de JWT.
const ExtractJwt = jwt.ExtractJwt; //Extractor de jwt ya sea de header, cookies, etc.

const initializePassport = () => {
    //Creamos el cookie extractor:

    const cookieExtractor = req => {
        let token = null;
        //Corroboramos que hay alguna cookie que tomar:
        if (req && req.cookies) {
            token = req.cookies["coderCookieToken"];
            //Tomamos nuestra cookie
        }
        return token;
    }

    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "coderhouse"
        //Misma palabrita que metimos en la ruta! ojo!
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error)
        }
    }));
}

export default initializePassport;