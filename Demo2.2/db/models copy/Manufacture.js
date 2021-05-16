module.exports = (sequelize, DataTypes, Sequelize) => {
    const Manufacture = sequelize.define('manufacture', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        manufacture: { type: DataTypes.STRING(127), allowNull: false }
    }, { timestamps: false })
    return Manufacture;
};
