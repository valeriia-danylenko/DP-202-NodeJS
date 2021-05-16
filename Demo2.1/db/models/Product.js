
module.exports = (sequelize, DataTypes, Sequelize, Model) => {
    class Product extends Model {
        static associate(models) {
            Product.hasMany(models.Order_item, { foreignKey: 'product_id'});
            Product.belongsTo(models.Manufacture, { foreignKey: 'manufacture_id'});
            Product.belongsTo(models.Category, { foreignKey: 'category_id' });
            Product.belongsTo(models.Unit, { foreignKey: 'units_id' });
        }
    }
    Product.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(127), allowNull: false },
        manufacture_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Manufacture', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
        category_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Category', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
        ingridients: { type: DataTypes.TEXT },
        amount: { type: DataTypes.INTEGER, allowNull: false },
        units_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Units', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
        price: { type: DataTypes.REAL, allowNull: false },
        img_link: { type: DataTypes.STRING(511), allowNull: false }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'product'
    });
    return Product;
};