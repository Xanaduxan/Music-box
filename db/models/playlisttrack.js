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
    playlistId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Playlists',
        key: 'id',
      },
    },
    trackId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tracks',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'PlaylistTrack',
  });
  return PlaylistTrack;
};
