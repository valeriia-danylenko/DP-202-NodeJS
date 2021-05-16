module.exports = (sequelize, DataTypes, Sequelize) => {
    const Unit = sequelize.define('unit', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        units: { type: DataTypes.STRING(10), allowNull: false }
    }, { timestamps: false })
    return Unit;
};