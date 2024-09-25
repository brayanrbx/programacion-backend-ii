import express from 'express';
import { engine } from 'express-handlebars';
import routeMain from '../routes/routes.js';
import views from '../routes/views.router.js';
import passport from 'passport';
import initializePassport from '../config/passport.config.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.use(express.static('./src/public'));
app.use(cookieParser());
app.use(passport.initialize());

initializePassport();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');


app.use('/', views);
app.use('/api', routeMain);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const msg = err.message || 'Internal Server Error';
    res.status(status).json({
        msg,
        stack: err.stack
    })
});

export default app