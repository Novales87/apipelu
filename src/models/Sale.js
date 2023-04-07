const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Sale",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userContact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      barberAssigned: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      barberService: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      serviceAmount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      reservePrice: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
