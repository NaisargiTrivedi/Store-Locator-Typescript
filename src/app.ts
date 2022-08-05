import 'dotenv/config';
import express, { Application } from 'express';
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';
import bcryptjs from 'bcryptjs';

import sequelize from './helpers/databaseConnection';
import userModel from './models/userModel';
import router from './routes/index.route';
import { cors, registerSession } from './middlewares/index.middleware';

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Added helmet before static files in order to allow them to be loaded in browser.
// Also have to add crossorigin="anonymous" in cdn links to work set contentSecurityPolicy: false in helmet.
app.use(helmet({
    contentSecurityPolicy: false,
}));

app.use(compression());

app.use(express.static(__dirname + '/public'));

app.use(cors);
app.use(registerSession);

userModel.findOne({
    where: { email: "admin@gmail.com" },
}).then((user) => {
    if (!user) {
        sequelize.sync()
            .then(() => {
                const salt: Promise<string> = bcryptjs.genSalt(10);
                salt.then(result => {
                    return bcryptjs.hash(process.env.ADMIN_PASSWORD as string, result);
                })
                    .then(hashedPwd => {
                        userModel.create({ email: "admin@gmail.com", password: hashedPwd });
                    })
            })
            .catch((err) => {
                console.log(err)
            });
    }
});

app.use(router); // testing ma kem router position swap karvi padi??....chai.use(http) must setup the server 1st before sending requests.

app.listen(4000, () => {
    console.log("listening" + 4000)
});

export default app;