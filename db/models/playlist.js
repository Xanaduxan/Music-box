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
    static associate({ User, Track, PlaylistTrack }) {
      Playlist.belongsTo(User, {
        foreignKey: 'userId',
      });
      Playlist.belongsToMany(Track, { through: PlaylistTrack, foreignKey: 'trackId', otherKey: 'playlistId' });
    }
  }
  Playlist.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};
