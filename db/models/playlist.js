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
      Playlist.belongsToMany(Track, { through: PlaylistTrack, foreignKey: 'playlistId', otherKey: 'trackId' });
    }
  }
  Playlist.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    title: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};
