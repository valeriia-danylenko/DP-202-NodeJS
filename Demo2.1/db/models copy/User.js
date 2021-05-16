module.exports = (sequelize, DataTypes, Sequelize) => {
    const User = sequelize.define('user', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        phone: { type: DataTypes.STRING(15), allowNull: false },
        user_name: { type: DataTypes.STRING(31), allowNull: false },
        email: { type: DataTypes.STRING(127) },
        password: { type: DataTypes.STRING(31), allowNull: false },
    }, { timestamps: false });
    return User;
};
