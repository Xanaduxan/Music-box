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
    static associate({ User, PlaylistTrack }) {
      Track.belongsTo(User, {
        foreignKey: 'userId',
      });
      Track.hasMany(PlaylistTrack, {
        foreignKey: 'trackId',
      });
    }
  }
  Track.init({
    title: DataTypes.TEXT,
    image: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Track',
  });
  return Track;
};
