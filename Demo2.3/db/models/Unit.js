
module.exports = (sequelize, DataTypes, Sequelize, Model) => {
    class Unit extends Model {
        static associate(models) {
            Unit.hasMany(models.Product, { foreignKey: 'units_id' })
        }
    }
    Unit.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        unit: { type: DataTypes.STRING(15), allowNull: false }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'unit'
    });
    return Unit;
};