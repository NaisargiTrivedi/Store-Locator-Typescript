import { INTEGER, ModelDefined, Optional, STRING } from 'sequelize';
import sequelize from '../helpers/databaseConnection';

export interface UserAttributes {
    id: number,
    email: string,
    password: string
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

const userModel: ModelDefined<UserAttributes, UserCreationAttributes> = sequelize.define("User", {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: STRING,
        allowNull: false
    },
    password: {
        type: STRING,
        allowNull: false
    }
});

export default userModel;