module.exports = (sequelize, DataTypes, Sequelize) => {
    const Order_item = sequelize.define('order_item', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        order_id: { type: DataTypes.INTEGER, allowNull: false , references: { model: 'Order', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },
        product_id: { type: DataTypes.INTEGER, allowNull: false , references: { model: 'Product', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },
        amount: { type: DataTypes.INTEGER, allowNull: false }
    }, { timestamps: false })
    return Order_item;
};