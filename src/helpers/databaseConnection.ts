import 'dotenv/config';
import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';

let connectionString = "";
(process.env.ENV === "dev") ? connectionString = process.env.CONNECTION_STRING as string : connectionString = process.env.CONNECTION_STRING_TEST as string;

console.log("env....", process.env.ENV);
console.log(connectionString);

mongoose.connect(connectionString, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('connected');
    }
});

const sequelize: Sequelize = new Sequelize(process.env.DB_NAME as string, process.env.MYSQL_USER as string, process.env.MYSQL_PASSWORD as string, {
    'dialect': 'mysql',
    "host": "localhost"
});

try {
    sequelize.authenticate().then((err) => console.log("connected................",err));
}
catch (err) {
    console.log("errdbconn..........", err);
}

export default sequelize;