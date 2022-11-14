const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Playlist, Track, Comment }) {
      User.hasMany(Playlist, {
        foreignKey: 'userId',
      });
      User.hasMany(Track, {
        foreignKey: 'userId',
      });
      User.hasMany(Comment, {
        foreignKey: 'userId',
      });
    }
  }
  User.init({
    name: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
