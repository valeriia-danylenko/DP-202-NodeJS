
module.exports = (sequelize, DataTypes, Sequelize, Model) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.User, {foreignKey: 'user_id'});
            Order.hasMany(models.Order_item, {foreignKey: 'order_id'});
        }
    }
    Order.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'User', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
        time: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'order'
    });
    return Order;
};