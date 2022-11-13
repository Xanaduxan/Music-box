const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlaylistTrack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Playlist, Track }) {
      PlaylistTrack.belongsTo(Playlist, {
        foreignKey: 'playlistId',
      });
      PlaylistTrack.belongsTo(Track, {
        foreignKey: 'trackId',
      });
    }
  }
  PlaylistTrack.init({
    playlistId: DataTypes.INTEGER,
    trackId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'PlaylistTrack',
  });
  return PlaylistTrack;
};
