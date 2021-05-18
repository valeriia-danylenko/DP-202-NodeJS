module.exports = (sequelize, DataTypes, Sequelize) => {
    const Order = sequelize.define('order', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'User', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },
        time: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
    }, { timestamps: false })
    return Order;
};