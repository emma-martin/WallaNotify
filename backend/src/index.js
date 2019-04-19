import "dotenv/config";
import bodyParser from 'body-parser';
import cors from "cors";
import express from "express";
import models, { sequelize } from './models';
import routes from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(async (req, res, next) => {
    req.context = {
        models,
        me: await models.User.findByLogin('lemon'),
    };
    next();
});
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/searches', routes.search);


const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
        createUsers();
    }
    app.listen(process.env.PORT, () => {
        console.log(`Example app listening on port ${process.env.PORT}!`)
    });
});

const createUsers = async () => {
    await models.User.create(
        {
            username: 'lemon',
        },
        {
            include: [models.Search],
        },
    );
};
