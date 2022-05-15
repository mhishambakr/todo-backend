const { DB, USER, PASSWORD, HOST, dialect } = require('../config/db.config');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    DB,
    USER,
    PASSWORD,
    {
        host: HOST,
        dialect: dialect,
        operatorsAliases: 'false',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    }
)

let User = require("./User/User.model")(sequelize, Sequelize);
let List = require("./List/List.model")(sequelize, Sequelize);
let Item = require('./Item/Item.model')(sequelize, Sequelize);

User.hasOne(List);
List.belongsTo(User);

List.hasMany(Item);
Item.belongsTo(List);

module.exports = {
    sequelize,
    User,
    List,
    Item
}
