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
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    playlistId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Playlists',
        key: 'id',
      },
    },
    comment: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
