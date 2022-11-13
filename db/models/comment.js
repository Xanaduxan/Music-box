const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Playlist }) {
      Comment.belongsTo(User, {
        foreignKey: 'userId',
      });
      Comment.belongsTo(Playlist, {
        foreignKey: 'playlistId',
      });
    }
  }
  Comment.init({
    userId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
