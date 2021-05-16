
module.exports = (sequelize, DataTypes, Sequelize, Model) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Order, { foreignKey: 'user_id' });
        }
    }
    User.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        phone: { type: DataTypes.STRING(15), allowNull: false },
        user_name: { type: DataTypes.STRING(31), allowNull: false },
        email: { type: DataTypes.STRING(127) },
        password: { type: DataTypes.STRING(31), allowNull: false },
    }, {
        sequelize,
        timestamps: false,
        modelName: 'user'
    });
    return User;
};