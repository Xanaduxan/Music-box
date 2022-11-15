const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Playlist, PlaylistTrack }) {
      Track.belongsTo(User, {
        foreignKey: 'userId', onDelete: 'CASCADE',
      });
      Track.belongsToMany(Playlist, { through: PlaylistTrack, foreignKey: 'trackId', otherKey: 'playlistId' });
    }
  }
  Track.init({
    title: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    image: DataTypes.TEXT,
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Track',
  });
  return Track;
};
