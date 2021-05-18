
module.exports = (sequelize, DataTypes, Sequelize, Model) => {
    class Manufacture extends Model {
        static associate(models) {
            Manufacture.hasMany(models.Product, { foreignKey: 'manufacture_id' })
        }
    }
    Manufacture.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        manufacture: { type: DataTypes.STRING(127), allowNull: false }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'manufacture'
    });
    return Manufacture;
};