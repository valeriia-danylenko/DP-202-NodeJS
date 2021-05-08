module.exports = (sequelize, DataTypes, Sequelize) => {
    const User = sequelize.define('user', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        phone: { type: DataTypes.STRING(12), allowNull: false },
        user_name: { type: DataTypes.STRING(30), allowNull: false },
        email: { type: DataTypes.STRING(100) },
        password: { type: DataTypes.STRING(30), allowNull: false },
    }, { timestamps: false });
    return User;
};
