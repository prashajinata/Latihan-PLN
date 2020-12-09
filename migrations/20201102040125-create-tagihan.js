'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tagihan', {
      id_tagihan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_penggunaan: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: "penggunaan",
          key: "id_penggunaan"
        }
      },
      bulan: {
        type: Sequelize.STRING
      },
      tahun: {
        type: Sequelize.STRING
      },
      jumlah_meter: {
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tagihan');
  }
};