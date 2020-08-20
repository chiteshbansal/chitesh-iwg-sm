const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const orderItem = sequelize.define("orderItem", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity:Sequelize.INTEGER,
});

module.exports = orderItem;
