/* eslint-disable no-param-reassign */
import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class Photo extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'O Campo originalName é Obrigatorio',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'O Campo file é Obrigatorio',
          },
        },
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue('filename')}`;
        },
      },
    },
    {
      sequelize,
      tableName: 'photos',
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Funcionarios, { foreignKey: 'funcionarios_id' });
  }
}
