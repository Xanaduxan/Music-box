const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      Playlist.belongsTo(User, {
        foreignKey: 'userId',
      });
    }
  }
  Playlist.init({
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};
