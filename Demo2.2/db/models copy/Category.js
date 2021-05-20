module.exports = (sequelize, DataTypes, Sequelize) => {
    const Category = sequelize.define('category', {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        category: { type: DataTypes.STRING(63), allowNull: false}
    }, { timestamps: false })
    return Category;
};
