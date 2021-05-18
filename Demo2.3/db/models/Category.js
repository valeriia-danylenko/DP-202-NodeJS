module.exports = (sequelize, DataTypes, Sequelize, Model) => {

    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Product, { foreignKey: 'category_id' })
        }
    }

    Category.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        category: { type: DataTypes.STRING(63), allowNull: false }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'category'
    });

    return Category;
};
