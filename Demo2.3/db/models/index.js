const { Sequelize, DataTypes, Model } = require('sequelize');
const dotenv = require('dotenv').config({ path: __dirname + '/../../.env' });
const fs = require("fs");
const path = require("path");
const stage = process.env.STAGE || 'development'

let keys;
if (stage === 'development') {
    keys = require('../config/config').development;
}

const { username, password, database, host } = keys;
const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host: host,
        dialect: 'postgres'
    });

const db = {};

function cap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)};

fs.readdirSync(__dirname + '\\')
    .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
    .forEach(file => {
        const model = require(path.join(__dirname + '\\', file))(sequelize, DataTypes, Sequelize, Model);
        db[cap(model.name)] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

