module.exports = (sequelize, DataTypes, Sequelize) => {

    const Product = sequelize.define('product', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(100), allowNull: false },
        manufacture_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Manufacture', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },
        category_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Category', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },
        ingridients: { type: DataTypes.STRING(1000) },
        amount: { type: DataTypes.INTEGER, allowNull: false },
        units_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Units', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },
        price: { type: DataTypes.REAL, allowNull: false },
        img_link: { type: DataTypes.STRING(500), allowNull: false }
    }, { timestamps: false });
    return Product;
};