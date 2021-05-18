const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv').config({ path: __dirname + '/../../.env' });
const fs = require("fs");
const path = require("path");
const stage = process.env.STAGE || 'development'

let keys;
if (stage === 'development') {
    keys = require('../config/config').development;
}

const {username, password, database, host} = keys;
const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host: host,
        dialect: 'postgres'
    });

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

function cap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)};

fs.readdirSync(__dirname + '\\')
    .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
    .forEach(file => {
        const model = require(path.join(__dirname + '\\', file))(sequelize, DataTypes, Sequelize);
        db[cap(model.name)] = model;
    });

db.Manufacture.hasMany(db.Product, { foreignKey: 'manufacture_id' });
db.Product.belongsTo(db.Manufacture, { foreignKey: 'manufacture_id' });

db.Category.hasMany(db.Product, { foreignKey: 'category_id' });
db.Product.belongsTo(db.Category, { foreignKey: 'category_id' });

db.Unit.hasMany(db.Product, { foreignKey: 'units_id' });
db.Product.belongsTo(db.Unit, { foreignKey: 'units_id' });

db.Order.belongsTo(db.User, {foreignKey: 'user_id'});
db.User.hasMany(db.Order, {foreignKey: 'user_id'});

db.Order.hasMany(db.Order_item, {foreignKey: 'order_id'});
db.Order_item.belongsTo(db.Order, {foreignKey: 'order_id'});

db.Order_item.belongsTo(db.Product, {foreignKey: 'product_id'});
db.Product.hasMany(db.Order_item, {foreignKey: 'product_id'});

module.exports = db;

