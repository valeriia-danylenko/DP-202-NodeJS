
module.exports = (sequelize, DataTypes, Sequelize, Model) => {
    class Order_item extends Model {
        static associate(models) {
            Order_item.belongsTo(models.Order, { foreignKey: 'order_id' });
            Order_item.belongsTo(models.Product, { foreignKey: 'product_id' });
        }
    }
    Order_item.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        order_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Order', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
        product_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Product', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
        amount: { type: DataTypes.INTEGER, allowNull: false }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'order_item'
    });
    return Order_item;
};