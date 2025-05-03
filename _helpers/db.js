const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
require('dotenv').config();

module.exports = db = {};

initialize();

async function initialize() {
    const { host, port, user, password, database } = config.database;

    // Create a connection to MySQL
    const connection = await mysql.createConnection({ host, port, user, password });

    // Create the database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // Connect to the database using Sequelize
    const sequelize = new Sequelize(database, user, password, { host, port, dialect: 'mysql' });
    
    // Initialize models and relationships
    db.Account = require('../accounts/account.model')(sequelize);
    db.RefreshToken = require('../accounts/refresh-token.model')(sequelize);

    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);

    // Sync models with the database
    await sequelize.sync();
}